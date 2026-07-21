import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    metaKeywords: { type: String, trim: true },
    openGraph: {
        ogTitle: { type: String, trim: true },
        ogDescription: { type: String, trim: true },
        ogImage: { type: String, trim: true },
        ogType: { type: String, default: 'website' },
        ogUrl: { type: String, trim: true }
    },
    canonicalUrl: { type: String, trim: true },
    robots: { type: String, default: 'index, follow' }
}, { _id: false });

const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        enum: ['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'tiktok', 'whatsapp', 'other']
    },
    url: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true }
}, { _id: false });

const footerLinkSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }
}, { _id: false });

// Sub-schemas for About Us
const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    bio: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { _id: false });

const valueSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String, trim: true } // Standard icon string (e.g., 'compass', 'heart', 'shield')
}, { _id: false });

const statSchema = new mongoose.Schema({
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true }, // e.g., '10,000+', '15+'
    icon: { type: String, trim: true }
}, { _id: false });

const aboutUsSchema = new mongoose.Schema({
    title: { type: String, trim: true, default: 'About Baig Tours' },
    subtitle: { type: String, trim: true },
    story: { type: String, trim: true },
    mission: { type: String, trim: true },
    vision: { type: String, trim: true },
    bannerImage: { type: String, default: '' },
    values: [valueSchema],
    team: [teamMemberSchema],
    stats: [statSchema]
}, { _id: false });

const websiteSettingsSchema = new mongoose.Schema({
    // Basic Info
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: 100
    },
    companyDescription: { type: String, trim: true, maxlength: 500 },
    companyLogo: { type: String, default: '' },
    favicon: { type: String, default: '' },

    // Contact Info
    address: { type: String, trim: true, maxlength: 500 },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    whatsappNumber: { type: String, trim: true },

    // Social Media Links
    socialLinks: [socialLinkSchema],

    // NEW: About Us Structured Content Section
    aboutUs: { type: aboutUsSchema, default: () => ({}) },

    // Google Maps
    googleMaps: {
        embedUrl: { type: String, trim: true },
        latitude: { type: Number },
        longitude: { type: Number },
        zoom: { type: Number, default: 15 }
    },

    // Footer Content
    footerContent: {
        copyrightText: { type: String, trim: true, maxlength: 200 },
        footerDescription: { type: String, trim: true, maxlength: 500 },
        footerLinks: [footerLinkSchema]
    },

    // SEO Settings
    seo: { type: seoSchema, default: () => ({}) },

    // XML Sitemap
    sitemap: {
        lastGenerated: { type: Date },
        url: { type: String, trim: true }
    },

    // Robots.txt
    robotsTxt: {
        type: String,
        default: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: https://baigtours.com/sitemap.xml`
    },

    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const WebsiteSettings = mongoose.model('WebsiteSettings', websiteSettingsSchema);
export default WebsiteSettings;