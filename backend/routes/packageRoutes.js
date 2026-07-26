import express from 'express';
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  duplicatePackage,
} from '../controllers/packageController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Middleware to handle both images and promo video fields
const packageUpload = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'promoVideo', maxCount: 1 },
]);

router.route('/')
  .get(getPackages)
  .post(protect, packageUpload, createPackage);

router.route('/:id')
  .get(getPackageById)
  .put(protect, packageUpload, updatePackage)
  .delete(protect, deletePackage);

router.post('/:id/duplicate', protect, duplicatePackage);

export default router;