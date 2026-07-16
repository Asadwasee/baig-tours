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
import upload from '../middlewares/uploadMiddleware.js'; 

const router = express.Router();

// Yahan app.post par upload middleware lagayein jo 'images' key se multiple files accept karega
router.route('/')
  .get(getPackages)
  .post(protect, upload.array('images', 5), createPackage);

router.route('/:id')
  .get(getPackageById)
  .put(protect, upload.array('images', 5), updatePackage)
  .delete(protect, deletePackage);

router.post('/:id/duplicate', protect, duplicatePackage);

export default router;