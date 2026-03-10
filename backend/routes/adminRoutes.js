const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getAdminStats, getUsers, updateUserRole } = require('../controllers/adminController');

// @desc    Get global statistics and aggregations
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, getAdminStats);

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, getUsers);

// @desc    Update a user role (Admin escalation / Suspension)
// @route   PATCH /api/admin/users/:id
// @access  Private/Admin
router.patch('/users/:id', protect, admin, updateUserRole);

module.exports = router;
