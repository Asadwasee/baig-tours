import express from 'express';
import upload from '../middlewares/upload.js';
import { validateFields,settingsValidationRules,seoValidationRules,socialLinkValidationRules,robotsValidationRules} from '../middlewares/validation.js';
import {getSettings,updateSettings,updateSeoSettings,updateSocialLinks,generateSitemap,getRobotsTxt,updateRobotsTxt} from '../controllers/settingsController.js';

const router = express.Router();
router.get('/getall', getSettings);
router.get('/robots.txt', getRobotsTxt);
router.get('/sitemap', generateSitemap);
router.put('/update_settings',upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 }
    ]),settingsValidationRules(),validateFields,updateSettings);
router.put('/update_seo_settings',seoValidationRules(),validateFields,updateSeoSettings);
router.put('/update_social_links',socialLinkValidationRules(),validateFields,updateSocialLinks);
router.put('/update_robots_txt',robotsValidationRules(),validateFields,updateRobotsTxt
);

export default router;