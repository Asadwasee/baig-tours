import Gallery from '../models/Gallery.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// @desc    Upload media (Image/Video to Cloudinary)
// @route   POST /api/gallery/media/upload
// @access  Private/Admin
export const uploadMedia = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title and category are required'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        const fileType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
        const mediaUrl = await uploadToCloudinary(req.file.buffer, 'baig_tours_gallery');

        const gallery = await Gallery.create({
            title,
            description: description || '',
            mediaType: fileType,
            mediaUrl,
            category,
            isActive: true
        });

        res.status(201).json({
            success: true,
            message: 'Media uploaded successfully',
            data: gallery
        });

    } catch (error) {
        console.error('Upload Media Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get all media
// @route   GET /api/gallery/media/getall
// @access  Public
export const getAllMedia = async (req, res) => {
    try {
        const { category, mediaType, page = 1, limit = 20 } = req.query;
        const query = { isActive: true };

        if (category) query.category = category;
        if (mediaType) query.mediaType = mediaType;

        const skip = (page - 1) * limit;
        const [media, total] = await Promise.all([
            Gallery.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Gallery.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            message: 'Media fetched successfully',
            data: media,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get All Media Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get media by category
// @route   GET /api/gallery/media/category/:category
// @access  Public
export const getMediaByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const media = await Gallery.find({ category, isActive: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: `Media fetched for category: ${category}`,
            data: media
        });
    } catch (error) {
        console.error('Get Media By Category Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get single media
// @route   GET /api/gallery/media/:id
// @access  Public
export const getMediaById = async (req, res) => {
    try {
        const media = await Gallery.findById(req.params.id);

        if (!media) {
            return res.status(404).json({
                success: false,
                message: 'Media not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Media fetched successfully',
            data: media
        });
    } catch (error) {
        console.error('Get Media Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Update media (With Cloudinary Cleanup)
// @route   PUT /api/gallery/media/update/:id
// @access  Private/Admin
export const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const media = await Gallery.findById(id);
        if (!media) {
            return res.status(404).json({
                success: false,
                message: 'Media not found'
            });
        }

        // Cleanup old media file if a new file is uploaded
        if (req.file) {
            if (media.mediaUrl) {
                await deleteFromCloudinary(media.mediaUrl);
            }
            updateData.mediaUrl = await uploadToCloudinary(req.file.buffer, 'baig_tours_gallery');
            updateData.mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
        }

        const updatedMedia = await Gallery.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Media updated successfully',
            data: updatedMedia
        });
    } catch (error) {
        console.error('Update Media Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Delete media (With Cloudinary Cleanup)
// @route   DELETE /api/gallery/media/:id
// @access  Private/Admin
export const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Gallery.findById(id);
        if (!media) {
            return res.status(404).json({
                success: false,
                message: 'Media not found'
            });
        }

        // Delete main media file from Cloudinary
        if (media.mediaUrl) {
            await deleteFromCloudinary(media.mediaUrl);
        }

        // Delete thumbnail if present
        if (media.thumbnail) {
            await deleteFromCloudinary(media.thumbnail);
        }

        await media.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Media deleted successfully'
        });
    } catch (error) {
        console.error('Delete Media Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get media stats (Count by Category)
// @route   GET /api/gallery/media/media_stats
// @access  Public
export const getMediaStats = async (req, res) => {
    try {
        const stats = await Gallery.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    images: {
                        $sum: { $cond: [{ $eq: ['$mediaType', 'image'] }, 1, 0] }
                    },
                    videos: {
                        $sum: { $cond: [{ $eq: ['$mediaType', 'video'] }, 1, 0] }
                    }
                }
            }
        ]);

        const total = await Gallery.countDocuments();

        res.status(200).json({
            success: true,
            message: 'Media stats fetched successfully',
            data: {
                total,
                categories: stats
            }
        });
    } catch (error) {
        console.error('Get Media Stats Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};