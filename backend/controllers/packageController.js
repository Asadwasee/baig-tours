import Package from '../models/Package.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// @desc    Create new tour package
// @route   POST /api/packages
// @access  Private/Admin
export const createPackage = async (req, res) => {
  try {
    const { title } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const packageExists = await Package.findOne({ slug });
    if (packageExists) {
      return res.status(400).json({ message: 'A package with similar title already exists' });
    }

    // Image Upload Logic (Supports both physical files and direct URL arrays)
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      // Agar admin ne local computer se files upload ki hain
      const uploadPromises = req.files.map((file) => 
        uploadToCloudinary(file.buffer, 'baig_tours_packages')
      );
      imageUrls = await Promise.all(uploadPromises);
    } else if (req.body.images) {
      // Agar admin ne direct JSON body mein images ke web links bheje hain
      imageUrls = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const newPackage = new Package({
      ...req.body,
      slug,
      images: imageUrls, // Sahi links save honge
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const { 
      search, 
      destination, 
      category, 
      duration, 
      minPrice, 
      maxPrice, 
      sort 
    } = req.query;

    // 1. DYNAMIC QUERY BUILDER
    let query = {};

    // Search by Title or Destination (Regex / Case-Insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by Destination
    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    // Filter by Category
    if (category) {
      query.category = category;
    }

    // Filter by Duration (e.g., "5 Days")
    if (duration) {
      query.duration = { $regex: duration, $options: 'i' };
    }

    // Intelligent Price Filter (Checks both discountPrice and base price)
    if (minPrice || maxPrice) {
      const min = Number(minPrice) || 0;
      const max = Number(maxPrice) || Infinity;

      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          {
            discountPrice: { $exists: true, $ne: null },
            discountPrice: { $gte: min, $lte: max }
          },
          {
            discountPrice: null,
            price: { $gte: min, $lte: max }
          }
        ]
      });
    }

    // 2. SORTING LOGIC
    let sortQuery = {};
    if (sort) {
      if (sort === 'latest') {
        sortQuery = { createdAt: -1 };
      } else if (sort === 'price-low') {
        sortQuery = { price: 1 };
      } else if (sort === 'price-high') {
        sortQuery = { price: -1 };
      } else if (sort === 'popular') {
        sortQuery = { isFeatured: -1, availableSeats: 1 }; // Featured & almost booked first
      }
    } else {
      sortQuery = { createdAt: -1 }; // Default: Latest first
    }

    // Query Execute
    const packages = await Package.find(query).sort(sortQuery);
    
    res.json({
      count: packages.length,
      packages
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get single package by ID
// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);

    if (!tourPackage) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    // FETCH RELATED PACKAGES (Same destination OR category, excluding current package)
    const relatedPackages = await Package.find({
      _id: { $ne: tourPackage._id }, // Current package ko nikal dein
      $or: [
        { destination: tourPackage.destination },
        { category: tourPackage.category }
      ]
    })
    .limit(3) // Sirf 3 packages recommend karein
    .select('title slug destination price discountPrice duration images availableSeats');

    res.json({
      package: tourPackage,
      relatedPackages
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update tour package
// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);

    if (tourPackage) {
      if (req.body.title) {
        req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }

      // Updated image logic for update API
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map((file) => 
          uploadToCloudinary(file.buffer, 'baig_tours_packages')
        );
        const newImageUrls = await Promise.all(uploadPromises);
        req.body.images = [...tourPackage.images, ...newImageUrls];
      } else if (req.body.images) {
        req.body.images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      }

      Object.assign(tourPackage, req.body);
      const updatedPackage = await tourPackage.save();
      res.json(updatedPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete tour package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);
    if (tourPackage) {
      await tourPackage.deleteOne();
      res.json({ message: 'Package removed successfully' });
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Duplicate tour package
// @route   POST /api/packages/:id/duplicate
// @access  Private/Admin
export const duplicatePackage = async (req, res) => {
  try {
    const originalPackage = await Package.findById(req.params.id);
    if (!originalPackage) {
      return res.status(404).json({ message: 'Original package not found' });
    }

    const objectToDuplicate = originalPackage.toObject();
    delete objectToDuplicate._id;
    delete objectToDuplicate.createdAt;
    delete objectToDuplicate.updatedAt;

    objectToDuplicate.title = `${objectToDuplicate.title} (Copy)`;
    objectToDuplicate.slug = `${objectToDuplicate.slug}-copy-${Date.now()}`;

    const duplicatedPackage = new Package(objectToDuplicate);
    const savedPackage = await duplicatedPackage.save();

    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




