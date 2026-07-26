import multer from 'multer';

// Memory storage use karenge taake disk par file temporary save na karni pare
const storage = multer.memoryStorage();

// Filter: Sirf images allow karne ke liye
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per image
});

export default upload;