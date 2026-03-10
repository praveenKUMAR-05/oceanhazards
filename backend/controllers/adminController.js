const User = require('../models/User');
const Report = require('../models/Report');

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalReports = await Report.countDocuments();
        const highRiskReports = await Report.countDocuments({ riskLevel: 'high' });

        // Hazard distribution aggregation
        const hazardDistribution = await Report.aggregate([
            { $group: { _id: "$hazardType", count: { $sum: 1 } } }
        ]);

        // Risk segment aggregation
        const riskSegments = await Report.aggregate([
            { $group: { _id: "$riskLevel", count: { $sum: 1 } } }
        ]);

        // Recent incident logs
        const recentReports = await Report.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name email credibilityScore');

        res.json({
            totalUsers,
            totalReports,
            highRiskReports,
            hazardDistribution,
            riskSegments,
            recentReports
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body; // Allows promoting to 'admin' or revoking to 'suspended' / 'user'
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAdminStats, getUsers, updateUserRole };
