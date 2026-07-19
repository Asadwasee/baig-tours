import Category from '../models/Category.js';
import Blog from '../models/Blog.js';

// CREATE CATEGORY
export const createCategory = async (req, res) => {
    try {
        const { name, description, icon, color, order } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }

        // ✅ Generate slug from name
        const slug = name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-');

        // Check if slug already exists
        const existingSlug = await Category.findOne({ slug });
        if (existingSlug) {
            return res.status(400).json({
                success: false,
                message: 'Category with similar name already exists'
            });
        }

        const category = await Category.create({
            name,
            slug,
            description: description || '',
            icon: icon || '📁',
            color: color || '#6366f1',
            order: order || 0
        });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        console.error('Create Category Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET ALL CATEGORIES WITH BLOG COUNTS
export const getAllCategories = async (req, res) => {
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
            message: 'Categories fetched successfully',
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
// GET CATEGORY BY SLUG WITH BLOGS
export const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const category = await Category.findOne({ slug, isActive: true });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            Blog.find({ category: slug, isPublished: true })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Blog.countDocuments({ category: slug, isPublished: true })
        ]);

        res.status(200).json({
            success: true,
            message: 'Category details fetched successfully',
            data: {
                category: {
                    id: category._id,
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                    icon: category.icon,
                    color: category.color,
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
        console.error('Get Category Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if name is being updated and if it already exists
        if (updateData.name && updateData.name !== category.name) {
            const existingCategory = await Category.findOne({ name: updateData.name });
            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: 'Category name already exists'
                });
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        console.error('Update Category Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if any blogs use this category
        const blogCount = await Blog.countDocuments({ category: category.slug });
        if (blogCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. ${blogCount} blogs are using this category.`
            });
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Delete Category Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};