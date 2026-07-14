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
    const packages = await Package.find({});
    res.json(packages);
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
    if (tourPackage) {
      res.json(tourPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
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



