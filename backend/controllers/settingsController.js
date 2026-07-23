import WebsiteSettings from '../models/WebsiteSettings.js';
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
                    canonicalUrl: 'https://baigtours.com'
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
// UPDATE WEBSITE SETTINGS (Admin)
export const updateSettings = async (req, res) => {
    try {
        let settings = await WebsiteSettings.findOne();
        if (!settings) settings = new WebsiteSettings();

        const updateData = { ...req.body };

        // Handle logo upload
        if (req.files?.logo) {
            if (settings.companyLogo) {
                const oldPath = path.join('uploads', path.basename(settings.companyLogo));
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.companyLogo = `/uploads/${req.files.logo[0].filename}`;
        }

        // Handle favicon upload
        if (req.files?.favicon) {
            if (settings.favicon) {
                const oldPath = path.join('uploads', path.basename(settings.favicon));
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.favicon = `/uploads/${req.files.favicon[0].filename}`;
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
// GENERATE SITEMAP
export const generateSitemap = async (req, res) => {
    try {
        const baseUrl = req.query.baseUrl || 'https://baigtours.com';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/tours</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
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
            message: 'Sitemap generated successfully',
            data: {
                url: `${baseUrl}/sitemap.xml`,
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
        const robotsTxt = settings?.robotsTxt || `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: https://baigtours.com/sitemap.xml`;

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