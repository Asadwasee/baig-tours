import Blog from '../models/Blog.js';
import Category from '../models/Category.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// @desc    Create a blog (Cloudinary Direct Buffer Upload)
// @route   POST /api/blogs/create
// @access  Private/Admin
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

        if (!title || !content || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title, content and category are required'
            });
        }

        // Cloudinary Direct Buffer Upload
        let featuredImage = req.body.featuredImage || '';
        if (req.file) {
            featuredImage = await uploadToCloudinary(req.file.buffer, 'baig_tours_blogs');
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
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Update a blog (With Cloudinary Cleanup on Image Replace)
// @route   PUT /api/blogs/update/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Cloudinary Upload & Cleanup Old Image
        if (req.file) {
            if (existingBlog.featuredImage) {
                await deleteFromCloudinary(existingBlog.featuredImage);
            }
            updateData.featuredImage = await uploadToCloudinary(req.file.buffer, 'baig_tours_blogs');
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
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Delete a blog (With Cloudinary Image Deletion)
// @route   DELETE /api/blogs/delete/:id
// @access  Private/Admin
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

        // Delete associated image from Cloudinary
        if (blog.featuredImage) {
            await deleteFromCloudinary(blog.featuredImage);
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

// @desc    Get all blogs
// @route   GET /api/blogs/get
// @access  Public
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

// @desc    Get blog by Slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
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

// @desc    Get blog by ID
// @route   GET /api/blogs/get/:id
// @access  Public
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

// @desc    Get blog categories with count
// @route   GET /api/blogs/categories
// @access  Public
export const getBlogCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 });

        const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const count = await Blog.countDocuments({
                    category: category.slug,
                    isPublished: true
                });

                return {
                    id: category._id,
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                    icon: category.icon,
                    color: category.color,
                    count: count,
                    isActive: category.isActive
                };
            })
        );

        res.status(200).json({
            success: true,
            message: 'Blog categories fetched successfully',
            data: categoriesWithCount
        });
    } catch (error) {
        console.error('Get Categories Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get all blog tags
// @route   GET /api/blogs/tags
// @access  Public
export const getBlogTags = async (req, res) => {
    try {
        const tags = await Blog.distinct('tags', { isPublished: true });

        const tagsWithCount = await Promise.all(
            tags.map(async (tag) => {
                const count = await Blog.countDocuments({ 
                    tags: tag, 
                    isPublished: true 
                });
                return { name: tag, count };
            })
        );

        tagsWithCount.sort((a, b) => b.count - a.count);

        res.status(200).json({
            success: true,
            message: 'Blog tags fetched successfully',
            data: tagsWithCount
        });
    } catch (error) {
        console.error('Get Tags Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get category details with blogs (Dynamic Database Category Query)
// @route   GET /api/blogs/categories/:categoryId
// @access  Public
export const getCategoryDetails = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        // Dynamic Database Check instead of hardcoded array
        const categoryObj = await Category.findOne({ slug: categoryId, isActive: true });
        const total = await Blog.countDocuments({ category: categoryId, isPublished: true });

        if (!categoryObj && total === 0) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const skip = (page - 1) * limit;
        const blogs = await Blog.find({ category: categoryId, isPublished: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const categoryData = categoryObj ? {
            id: categoryObj.slug,
            name: categoryObj.name,
            description: categoryObj.description || `Explore ${categoryObj.name} articles`,
            icon: categoryObj.icon || 'folder',
            color: categoryObj.color || '#6366f1',
            totalBlogs: total
        } : {
            id: categoryId,
            name: categoryId.replace(/-/g, ' ').toUpperCase(),
            description: `Articles under ${categoryId}`,
            icon: 'folder',
            color: '#6366f1',
            totalBlogs: total
        };

        res.status(200).json({
            success: true,
            message: 'Category details fetched successfully',
            data: {
                category: categoryData,
                blogs,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get Category Details Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get featured blogs
// @route   GET /api/blogs/featured
// @access  Public
export const getFeaturedBlogs = async (req, res) => {
    try {
        const { limit = 6 } = req.query;
        
        const blogs = await Blog.find({ 
            isFeatured: true, 
            isPublished: true 
        })
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            message: 'Featured blogs fetched successfully',
            data: blogs
        });
    } catch (error) {
        console.error('Get Featured Blogs Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Get blog with related posts
// @route   GET /api/blogs/slug/related/:slug
// @access  Public
export const getBlogWithRelated = async (req, res) => {
    try {
        const { slug } = req.params;
        
        const blog = await Blog.findOne({ slug, isPublished: true });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        await blog.incrementViews();

        const relatedBlogs = await Blog.find({
            category: blog.category,
            _id: { $ne: blog._id },
            isPublished: true
        })
        .select('title slug featuredImage publishDate')
        .limit(4);

        res.status(200).json({
            success: true,
            message: 'Blog fetched successfully',
            data: {
                blog,
                relatedBlogs
            }
        });
    } catch (error) {
        console.error('Get Blog With Related Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};