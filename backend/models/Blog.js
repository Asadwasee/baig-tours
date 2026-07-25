import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    featuredImage: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: [true, 'Blog content is required']
    },
    summary: {
        type: String,
        trim: true,
        maxlength: [300, 'Summary cannot exceed 300 characters']
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    authorImage: {
        type: String,
        default: ''
    },
    authorBio: {
        type: String,
        trim: true,
        maxlength: [500, 'Author bio cannot exceed 500 characters']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    // ✅ Updated Categories
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'travel-tips',      // Travel Tips
            'destinations',     // Destinations
            'food-guides',      // Food Guides
            'road-trips',       // Road Trips
            'hotel-reviews',    // Hotel Reviews
            'news',             // News
            'tour-guides',      // Tour Guides (New)
            'visa-guides'       // Visa Guides (New)
        ]
    },
    tags: [{
        type: String,
        trim: true
    }],
    seoMeta: {
        metaTitle: { type: String, trim: true },
        metaDescription: { type: String, trim: true },
        metaKeywords: { type: String, trim: true }
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    readTime: {
        type: Number,
        default: 5
    }
}, { timestamps: true });

// Auto-generate slug
blogSchema.pre('save', function() {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-');
    }
});

// Increment views method
blogSchema.methods.incrementViews = async function() {
    this.views += 1;
    return await this.save();
};

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;