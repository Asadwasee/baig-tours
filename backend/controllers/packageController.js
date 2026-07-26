import Package from '../models/Package.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Helper function to safely parse JSON strings from multipart form data
const parseJsonField = (field) => {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (error) {
      return field;
    }
  }
  return field;
};

// @desc    Create new tour package (With Images & Promo Video Support)
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

    // Handle Image Uploads
    let imageUrls = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      const uploadPromises = req.files.images.map((file) => 
        uploadToCloudinary(file.buffer, 'baig_tours_packages')
      );
      imageUrls = await Promise.all(uploadPromises);
    } else if (req.body.images) {
      imageUrls = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    // Handle Promo Video Upload or Link
    let promoVideoUrl = req.body.promoVideo || '';
    if (req.files && req.files.promoVideo && req.files.promoVideo.length > 0) {
      promoVideoUrl = await uploadToCloudinary(req.files.promoVideo[0].buffer, 'baig_tours_package_videos');
    }

    // Parse array/object fields if sent as JSON strings via Form Data
    const highlights = parseJsonField(req.body.highlights);
    const includedServices = parseJsonField(req.body.includedServices);
    const excludedServices = parseJsonField(req.body.excludedServices);
    const itinerary = parseJsonField(req.body.itinerary);
    const faqs = parseJsonField(req.body.faqs);

    const newPackage = new Package({
      ...req.body,
      slug,
      images: imageUrls,
      promoVideo: promoVideoUrl,
      highlights: Array.isArray(highlights) ? highlights : [],
      includedServices: Array.isArray(includedServices) ? includedServices : [],
      excludedServices: Array.isArray(excludedServices) ? excludedServices : [],
      itinerary: Array.isArray(itinerary) ? itinerary : [],
      faqs: Array.isArray(faqs) ? faqs : [],
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all packages (With Departure Date & Price/Category Filters)
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
      sort,
      departureDate,
      startDate,
      endDate,
      upcoming
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } }
      ];
    }

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (duration) {
      query.duration = { $regex: duration, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      const min = Number(minPrice) || 0;
      const max = Number(maxPrice) || Infinity;

      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          {
            discountPrice: { $exists: true, $ne: null, $gt: 0 },
            discountPrice: { $gte: min, $lte: max }
          },
          {
            $or: [{ discountPrice: null }, { discountPrice: 0 }],
            price: { $gte: min, $lte: max }
          }
        ]
      });
    }

    if (departureDate || startDate || endDate) {
      query.$and = query.$and || [];

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          query.$and.push({
            $or: [
              { startDate: { $gte: start, $lte: end } },
              { departureDate: { $gte: start, $lte: end } }
            ]
          });
        }
      } else if (departureDate || startDate) {
        const targetDate = new Date(departureDate || startDate);
        if (!isNaN(targetDate.getTime())) {
          query.$and.push({
            $or: [
              { startDate: { $gte: targetDate } },
              { departureDate: { $gte: targetDate } }
            ]
          });
        }
      }
    }

    if (upcoming === 'true') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { startDate: { $gte: today } },
          { departureDate: { $gte: today } },
          { startDate: { $exists: false } }
        ]
      });
    }

    let sortQuery = {};
    if (sort) {
      if (sort === 'latest') {
        sortQuery = { createdAt: -1 };
      } else if (sort === 'price-low') {
        sortQuery = { price: 1 };
      } else if (sort === 'price-high') {
        sortQuery = { price: -1 };
      } else if (sort === 'popular') {
        sortQuery = { isFeatured: -1, availableSeats: 1 };
      }
    } else {
      sortQuery = { createdAt: -1 };
    }

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

    const relatedPackages = await Package.find({
      _id: { $ne: tourPackage._id },
      $or: [
        { destination: tourPackage.destination },
        { category: tourPackage.category }
      ]
    })
    .limit(3)
    .select('title slug destination price discountPrice duration images promoVideo availableSeats');

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

    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (req.body.title) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    // Handle new images upload
    if (req.files && req.files.images && req.files.images.length > 0) {
      const uploadPromises = req.files.images.map((file) => 
        uploadToCloudinary(file.buffer, 'baig_tours_packages')
      );
      const newImageUrls = await Promise.all(uploadPromises);
      req.body.images = [...(tourPackage.images || []), ...newImageUrls];
    }

    // Handle new promo video upload
    if (req.files && req.files.promoVideo && req.files.promoVideo.length > 0) {
      if (tourPackage.promoVideo) {
        await deleteFromCloudinary(tourPackage.promoVideo);
      }
      req.body.promoVideo = await uploadToCloudinary(req.files.promoVideo[0].buffer, 'baig_tours_package_videos');
    }

    // Parse array/object fields if present
    if (req.body.highlights) req.body.highlights = parseJsonField(req.body.highlights);
    if (req.body.includedServices) req.body.includedServices = parseJsonField(req.body.includedServices);
    if (req.body.excludedServices) req.body.excludedServices = parseJsonField(req.body.excludedServices);
    if (req.body.itinerary) req.body.itinerary = parseJsonField(req.body.itinerary);
    if (req.body.faqs) req.body.faqs = parseJsonField(req.body.faqs);

    Object.assign(tourPackage, req.body);
    const updatedPackage = await tourPackage.save();
    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete tour package (With Cloudinary Cleanup)
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Clean up images from Cloudinary
    if (tourPackage.images && tourPackage.images.length > 0) {
      const deleteImagePromises = tourPackage.images.map((imgUrl) => deleteFromCloudinary(imgUrl));
      await Promise.all(deleteImagePromises);
    }

    // Clean up promo video from Cloudinary
    if (tourPackage.promoVideo) {
      await deleteFromCloudinary(tourPackage.promoVideo);
    }

    await tourPackage.deleteOne();
    res.json({ message: 'Package and associated media removed successfully' });
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