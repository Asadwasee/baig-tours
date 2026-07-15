import Blog from '../models/Blog.js';
import fs from 'fs';
import path from 'path';

// CREATE BLOG
export const createBlog = async (req, res) => {
    try {
        const {
            title,
            slug,
            content,
            author,
            category,
            tags,
            seoMeta,
            publishDate,
            isPublished
        } = req.body;

        let featuredImage = '';
        if (req.file) {
            featuredImage = `/uploads/${req.file.filename}`;
        }

        if (!title || !content || !category) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                success: false,
                message: 'Title, content and category are required'
            });
        }

        let blogSlug = slug;
        if (!blogSlug) {
            blogSlug = title
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, '')
                .replace(/\s+/g, '-');
        }

        const existingBlog = await Blog.findOne({ slug: blogSlug });
        if (existingBlog) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                success: false,
                message: 'Slug already exists'
            });
        }

        let tagsArray = tags;
        if (typeof tags === 'string') {
            tagsArray = tags.split(',').map(tag => tag.trim());
        }

        let seoMetaObject = seoMeta;
        if (typeof seoMeta === 'string') {
            try {
                seoMetaObject = JSON.parse(seoMeta);
            } catch (e) {
                seoMetaObject = {};
            }
        }

        const blog = await Blog.create({
            title,
            slug: blogSlug,
            featuredImage,
            content,
            author: author || 'Anonymous',
            category,
            tags: tagsArray || [],
            seoMeta: seoMetaObject || {},
            publishDate: publishDate || Date.now(),
            isPublished: isPublished !== undefined ? isPublished : true
        });

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: blog
        });
    } catch (error) {
        console.error('Create Blog Error:', error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// UPDATE BLOG
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        if (req.file) {
            if (existingBlog.featuredImage) {
                const oldImagePath = path.join('uploads', path.basename(existingBlog.featuredImage));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.featuredImage = `/uploads/${req.file.filename}`;
        }

        if (updateData.tags && typeof updateData.tags === 'string') {
            updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
        }

        if (updateData.seoMeta && typeof updateData.seoMeta === 'string') {
            try {
                updateData.seoMeta = JSON.parse(updateData.seoMeta);
            } catch (e) {
                updateData.seoMeta = {};
            }
        }

        if (updateData.slug && updateData.slug !== existingBlog.slug) {
            const slugExists = await Blog.findOne({
                slug: updateData.slug,
                _id: { $ne: id }
            });
            if (slugExists) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({
                    success: false,
                    message: 'Slug already exists'
                });
            }
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog
        });
    } catch (error) {
        console.error('Update Blog Error:', error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// DELETE BLOG
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        if (blog.featuredImage) {
            const imagePath = path.join('uploads', path.basename(blog.featuredImage));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Delete Blog Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {  
    try {
        const { category, page = 1, limit = 10 } = req.query;
        const query = { isPublished: true };

        if (category) query.category = category;

        const skip = (page - 1) * limit;
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Blog.countDocuments(query);

        res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            data: blogs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get All Blogs Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET BLOG BY SLUG
export const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug, isPublished: true });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        });
    } catch (error) {
        console.error('Get Blog Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET BLOG BY ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        });
    } catch (error) {
        console.error('Get Blog Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};