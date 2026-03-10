const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Use Memory Storage to intercept file before writing
const storage = multer.memoryStorage();

// File filter (accept images only)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Create Sharp Processing Middleware
const processImage = async (req, res, next) => {
    if (!req.file) return next();

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = req.file.fieldname + '-' + uniqueSuffix + '.jpg'; // Force jpeg
    const filepath = path.join(uploadDir, filename);

    try {
        await sharp(req.file.buffer)
            .resize(512, undefined, { // Resize to 512px width, auto height
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 }) // 80% compression
            .toFile(filepath);

        // Map it back to the req so controllers can read it using the old standard
        req.file.filename = filename;
        req.file.path = filepath;

        next();
    } catch (error) {
        console.error("Image processing error", error);
        next(new Error("Image processing failed"));
    }
};

module.exports = { upload, processImage };
