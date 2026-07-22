import WebsiteSettings from '../models/WebsiteSettings.js';
import Package from '../models/Package.js';
import Blog from '../models/Blog.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET WEBSITE SETTINGS (Public)
export const getSettings = async (req, res) => {
    try {
        let settings = await WebsiteSettings.findOne();

        if (!settings) {
            settings = await WebsiteSettings.create({
                companyName: 'Baig Tours',
                companyDescription: 'Your trusted travel partner',
                seo: {
                    metaTitle: 'Baig Tours - Explore the World',
                    metaDescription: 'Book your dream tour with Baig Tours.',
                    metaKeywords: 'travel, tours, Pakistan',
                    canonicalUrl: process.env.CLIENT_URL || 'https://baigtours.com'
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Website settings fetched successfully',
            data: settings
        });
    } catch (error) {
        console.error('Get Settings Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// UPDATE WEBSITE SETTINGS (Admin - Cloudinary Support)
export const updateSettings = async (req, res) => {
    try {
        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        const updateData = { ...req.body };

        // Handle logo upload to Cloudinary with old file cleanup
        if (req.files?.logo && req.files.logo.length > 0) {
            if (settings.companyLogo) {
                await deleteFromCloudinary(settings.companyLogo);
            }
            const logoUrl = await uploadToCloudinary(req.files.logo[0].buffer, 'baig_tours_settings');
            updateData.companyLogo = logoUrl;
        }

        // Handle favicon upload to Cloudinary with old file cleanup
        if (req.files?.favicon && req.files.favicon.length > 0) {
            if (settings.favicon) {
                await deleteFromCloudinary(settings.favicon);
            }
            const faviconUrl = await uploadToCloudinary(req.files.favicon[0].buffer, 'baig_tours_settings');
            updateData.favicon = faviconUrl;
        }

        const updatedSettings = await WebsiteSettings.findOneAndUpdate(
            {},
            updateData,
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Website settings updated successfully',
            data: updatedSettings
        });
    } catch (error) {
        console.error('Update Settings Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// GET ABOUT US SECTION SETTINGS (Public)
export const getAboutUsSettings = async (req, res) => {
    try {
        let settings = await WebsiteSettings.findOne().select('aboutUs companyName');
        
        if (!settings || !settings.aboutUs) {
            return res.status(200).json({
                success: true,
                message: 'About us section fetched',
                data: {
                    title: 'About Baig Tours',
                    subtitle: 'Your Trusted Travel Partner',
                    story: '',
                    mission: '',
                    vision: '',
                    bannerImage: '',
                    values: [],
                    team: [],
                    stats: []
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'About us section fetched successfully',
            data: settings.aboutUs
        });
    } catch (error) {
        console.error('Get About Us Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// UPDATE ABOUT US SECTION CONTENT (Admin)
export const updateAboutUsSettings = async (req, res) => {
    try {
        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        const { title, subtitle, story, mission, vision, values, team, stats } = req.body;

        if (!settings.aboutUs) {
            settings.aboutUs = {};
        }

        if (title !== undefined) settings.aboutUs.title = title;
        if (subtitle !== undefined) settings.aboutUs.subtitle = subtitle;
        if (story !== undefined) settings.aboutUs.story = story;
        if (mission !== undefined) settings.aboutUs.mission = mission;
        if (vision !== undefined) settings.aboutUs.vision = vision;

        // Parse array JSON fields if passed via Form Data
        if (values) {
            try {
                settings.aboutUs.values = typeof values === 'string' ? JSON.parse(values) : values;
            } catch (e) {
                settings.aboutUs.values = [];
            }
        }

        if (team) {
            try {
                settings.aboutUs.team = typeof team === 'string' ? JSON.parse(team) : team;
            } catch (e) {
                settings.aboutUs.team = [];
            }
        }

        if (stats) {
            try {
                settings.aboutUs.stats = typeof stats === 'string' ? JSON.parse(stats) : stats;
            } catch (e) {
                settings.aboutUs.stats = [];
            }
        }

        // Handle Banner Image upload to Cloudinary
        if (req.files?.bannerImage && req.files.bannerImage.length > 0) {
            if (settings.aboutUs.bannerImage) {
                await deleteFromCloudinary(settings.aboutUs.bannerImage);
            }
            const bannerUrl = await uploadToCloudinary(req.files.bannerImage[0].buffer, 'baig_tours_settings');
            settings.aboutUs.bannerImage = bannerUrl;
        }

        await settings.save();

        res.status(200).json({
            success: true,
            message: 'About us section updated successfully',
            data: settings.aboutUs
        });
    } catch (error) {
        console.error('Update About Us Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// UPDATE SEO SETTINGS ONLY
export const updateSeoSettings = async (req, res) => {
    try {
        const { metaTitle, metaDescription, metaKeywords, canonicalUrl, openGraph, robots } = req.body;

        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        settings.seo = {
            metaTitle: metaTitle || settings.seo?.metaTitle,
            metaDescription: metaDescription || settings.seo?.metaDescription,
            metaKeywords: metaKeywords || settings.seo?.metaKeywords,
            canonicalUrl: canonicalUrl || settings.seo?.canonicalUrl,
            openGraph: openGraph || settings.seo?.openGraph,
            robots: robots || settings.seo?.robots || 'index, follow'
        };

        await settings.save();

        res.status(200).json({
            success: true,
            message: 'SEO settings updated successfully',
            data: settings.seo
        });
    } catch (error) {
        console.error('Update SEO Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// UPDATE SOCIAL LINKS
export const updateSocialLinks = async (req, res) => {
    try {
        const { socialLinks } = req.body;

        if (!socialLinks || !Array.isArray(socialLinks)) {
            return res.status(400).json({
                success: false,
                message: 'Social links must be an array'
            });
        }

        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        settings.socialLinks = socialLinks;
        await settings.save();

        res.status(200).json({
            success: true,
            message: 'Social links updated successfully',
            data: settings.socialLinks
        });
    } catch (error) {
        console.error('Update Social Links Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// GENERATE DYNAMIC SITEMAP (With Live Packages & Blogs)
export const generateSitemap = async (req, res) => {
    try {
        const baseUrl = process.env.CLIENT_URL || req.query.baseUrl || 'https://baigtours.com';
        const today = new Date().toISOString().split('T')[0];

        const [packages, blogs] = await Promise.all([
            Package.find({}).select('slug updatedAt createdAt'),
            Blog.find({ isPublished: true }).select('slug updatedAt createdAt')
        ]);

        const packageUrlsXml = packages.map(pkg => {
            const lastMod = (pkg.updatedAt || pkg.createdAt || new Date()).toISOString().split('T')[0];
            return `    <url>
        <loc>${baseUrl}/tours/${pkg.slug || pkg._id}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        }).join('\n');

        const blogUrlsXml = blogs.map(blog => {
            const lastMod = (blog.updatedAt || blog.createdAt || new Date()).toISOString().split('T')[0];
            return `    <url>
        <loc>${baseUrl}/blog/${blog.slug || blog._id}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`;
        }).join('\n');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/tours</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${baseUrl}/blogs</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
<!-- Dynamic Tour Package Links -->
${packageUrlsXml}
<!-- Dynamic Blog Links -->
${blogUrlsXml}
</urlset>`;

        const publicDir = path.join(__dirname, '../public');
        if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        settings.sitemap = {
            lastGenerated: new Date(),
            url: `${baseUrl}/sitemap.xml`
        };
        await settings.save();

        res.status(200).json({
            success: true,
            message: 'Dynamic sitemap generated successfully',
            data: {
                url: `${baseUrl}/sitemap.xml`,
                totalPackagesIncluded: packages.length,
                totalBlogsIncluded: blogs.length,
                lastGenerated: new Date()
            }
        });
    } catch (error) {
        console.error('Generate Sitemap Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// GET ROBOTS.TXT
export const getRobotsTxt = async (req, res) => {
    try {
        const settings = await WebsiteSettings.findOne();
        const baseUrl = process.env.CLIENT_URL || 'https://baigtours.com';
        const defaultRobots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${baseUrl}/sitemap.xml`;
        const robotsTxt = settings?.robotsTxt || defaultRobots;

        res.setHeader('Content-Type', 'text/plain');
        res.send(robotsTxt);
    } catch (error) {
        console.error('Get Robots Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// UPDATE ROBOTS.TXT
export const updateRobotsTxt = async (req, res) => {
    try {
        const { robotsTxt } = req.body;

        if (!robotsTxt) {
            return res.status(400).json({
                success: false,
                message: 'Robots.txt content is required'
            });
        }

        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        settings.robotsTxt = robotsTxt;
        await settings.save();

        res.status(200).json({
            success: true,
            message: 'Robots.txt updated successfully',
            data: { robotsTxt }
        });
    } catch (error) {
        console.error('Update Robots Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};