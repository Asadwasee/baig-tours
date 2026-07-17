import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// UPLOAD MEDIA (Image/Video)
export const uploadMedia = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !category) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
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

        //Check file type
        const fileType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
        const mediaUrl = `/uploads/${req.file.filename}`;

        //Create gallery entry
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
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET ALL MEDIA
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
// GET MEDIA BY CATEGORY
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
// GET SINGLE MEDIA
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
// UPDATE MEDIA
export const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const media = await Gallery.findById(id);
        if (!media) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                success: false,
                message: 'Media not found'
            });
        }

        //If new file uploaded, delete old one
        if (req.file) {
            const oldFilePath = path.join('uploads', path.basename(media.mediaUrl));
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
            updateData.mediaUrl = `/uploads/${req.file.filename}`;
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
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// DELETE MEDIA
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

        // Delete physical file
        if (media.mediaUrl) {
            const filePath = path.join('uploads', path.basename(media.mediaUrl));
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
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

// ============================================================
// GET MEDIA STATS (Count by Category)
// ============================================================
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