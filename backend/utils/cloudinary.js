import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload file from memory buffer
export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Helper function to delete file from Cloudinary using URL
export const deleteFromCloudinary = async (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.includes('cloudinary.com')) {
    return;
  }

  try {
    const urlParts = fileUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) return;

    const pathParts = urlParts.slice(uploadIndex + 1);
    
    // Skip version prefix if present (e.g., v12345678)
    if (pathParts[0].startsWith('v') && !isNaN(pathParts[0].substring(1))) {
      pathParts.shift();
    }

    const publicIdWithExtension = pathParts.join('/');
    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));

    // Detect if the file is a video or image
    const isVideo = fileUrl.includes('/video/') || /\.(mp4|mkv|avi|mov|webm)$/i.test(publicIdWithExtension);
    const resourceType = isVideo ? 'video' : 'image';

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error('Error deleting asset from Cloudinary:', error.message);
  }
};