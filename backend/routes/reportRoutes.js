const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload, processImage } = require('../middleware/uploadMiddleware');
const { createReport, getReports, getNearbyReports, confirmReport } = require('../controllers/reportController');

// @desc    Submit a new report
// @route   POST /api/reports
// @access  Private 
router.post('/', protect, upload.single('image'), processImage, createReport);

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
router.get('/', getReports);

// @desc    Get nearby clusters
// @route   GET /api/reports/nearby
// @access  Public
router.get('/nearby', getNearbyReports);

// @desc    Confirm a report multi-user
// @route   POST /api/reports/:id/confirm
// @access  Private 
router.post('/:id/confirm', protect, confirmReport);

module.exports = router;
