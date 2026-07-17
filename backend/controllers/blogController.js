import Blog from '../models/Blog.js';

// @desc    Create a new blog
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

// @desc    Update a blog
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

// @desc    Delete a blog
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

// @desc    Get all blogs (with pagination & category filter)
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