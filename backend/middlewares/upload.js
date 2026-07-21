import multer from 'multer';

// Memory storage so files are kept in RAM buffer for Cloudinary upload
const storage = multer.memoryStorage();

// File filter - Allow images and videos
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/webm', 'video/quicktime'];
    
    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image and video files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});

export default upload;