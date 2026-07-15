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
    author: {
        type: String,
        default: 'Anonymous'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['technology', 'health', 'business', 'education', 'lifestyle', 'travel', 'food', 'fashion', 'sports', 'other']
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
    }
}, { timestamps: true });

blogSchema.pre('save', function() {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-');
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;