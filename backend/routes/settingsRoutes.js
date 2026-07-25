import express from "express";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  validateFields,
  settingsValidationRules,
  seoValidationRules,
  socialLinkValidationRules,
  robotsValidationRules,
} from "../middlewares/validation.js";
import {
  getSettings,
  updateSettings,
  updateSeoSettings,
  updateSocialLinks,
  generateSitemap,
  getRobotsTxt,
  updateRobotsTxt,
  getAboutUsSettings,
  updateAboutUsSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

// Public Routes
router.get("/getall", getSettings);
router.get("/about_us", getAboutUsSettings);
router.get("/robots.txt", getRobotsTxt);
router.get("/sitemap", generateSitemap);

// Protected Admin Routes
router.put(
  "/update_settings",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  settingsValidationRules(),
  validateFields,
  updateSettings,
);

router.put(
  "/update_about_us",
  protect,
  upload.fields([
    { name: "bannerImage", maxCount: 1 }
  ]),
  updateAboutUsSettings,
);

router.put(
  "/update_seo_settings",
  protect,
  seoValidationRules(),
  validateFields,
  updateSeoSettings,
);

router.put(
  "/update_social_links",
  protect,
  socialLinkValidationRules(),
  validateFields,
  updateSocialLinks,
);

router.put(
  "/update_robots_txt",
  protect,
  robotsValidationRules(),
  validateFields,
  updateRobotsTxt,
);

export default router;