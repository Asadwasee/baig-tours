import Blog from '../models/Blog.js';
import Category from '../models/Category.js';

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

        // Validation for required fields
        if (!title || !content || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title, content and category are required'
            });
        }

        // Direct Cloudinary secure URL handling
        let featuredImage = '';
        if (req.file) {
            featuredImage = req.file.path; 
        }

        // Slug management
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

        // Form-Data String parsing safety guards
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
//update blog
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

        if (req.file) {
            updateData.featuredImage = req.file.path;
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

// Delete a blog
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

// Get all blogs
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

//Get blog by Slug
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
//Get blog by ID
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
// Get blogs by category
export const getBlogCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 });

        // Get blog count for each category
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
// GET ALL BLOG TAGS
export const getBlogTags = async (req, res) => {
    try {
        const tags = await Blog.distinct('tags', { isPublished: true });

        // Get count for each tag
        const tagsWithCount = await Promise.all(
            tags.map(async (tag) => {
                const count = await Blog.countDocuments({ 
                    tags: tag, 
                    isPublished: true 
                });
                return { name: tag, count };
            })
        );

        // Sort by count (highest first)
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
// GET CATEGORY DETAILS WITH BLOGS
export const getCategoryDetails = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const validCategories = [
            'travel-tips', 'destinations', 'food-guides', 'road-trips',
            'hotel-reviews', 'news', 'tour-guides', 'visa-guides'
        ];

        if (!validCategories.includes(categoryId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category'
            });
        }

        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            Blog.find({ category: categoryId, isPublished: true })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Blog.countDocuments({ category: categoryId, isPublished: true })
        ]);

        // Category details
        const categoryDetails = {
            'travel-tips': { id: 'travel-tips', name: 'Travel Tips', description: 'Tips for traveling smarter', icon: '💡' },
            'destinations': { id: 'destinations', name: 'Destinations', description: 'Explore amazing destinations', icon: '🌍' },
            'food-guides': { id: 'food-guides', name: 'Food Guides', description: 'Best food spots and culinary experiences', icon: '🍜' },
            'road-trips': { id: 'road-trips', name: 'Road Trips', description: 'Epic road trip adventures', icon: '🚗' },
            'hotel-reviews': { id: 'hotel-reviews', name: 'Hotel Reviews', description: 'Honest hotel reviews', icon: '🏨' },
            'news': { id: 'news', name: 'News', description: 'Latest travel news', icon: '📰' },
            'tour-guides': { id: 'tour-guides', name: 'Tour Guides', description: 'Comprehensive tour guides', icon: '🗺️' },
            'visa-guides': { id: 'visa-guides', name: 'Visa Guides', description: 'Visa requirements and guides', icon: '🛂' }
        };

        res.status(200).json({
            success: true,
            message: 'Category details fetched successfully',
            data: {
                category: {
                    ...categoryDetails[categoryId],
                    totalBlogs: total
                },
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
// GET FEATURED BLOGS
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
// GET BLOG WITH RELATED POSTS
export const getBlogWithRelated = async (req, res) => {
    try {
        const { slug } = req.params;
        
        // Get main blog
        const blog = await Blog.findOne({ slug, isPublished: true });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Increment views
        await blog.incrementViews();

        // Get related blogs (same category)
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