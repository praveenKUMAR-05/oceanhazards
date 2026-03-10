const Report = require("../models/Report");
const User = require("../models/User");
const { detectHazardWithAI } = require("../services/aiVisionService");
const { getWeatherSeverity } = require("../services/weatherService");
const { calculateRisk } = require("../services/riskEngine");
const { checkAndEmitAlert } = require("../services/alertEngine");
const path = require("path");

const createReport = async (req, res) => {
    try {
        const { description, latitude, longitude } = req.body;

        if (!description || !latitude || !longitude) {
            return res.status(400).json({ message: "Description, latitude, and longitude are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image required" });
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const absoluteImagePath = path.join(__dirname, '..', imagePath);

        // 1. AI Vision
        const aiResult = await detectHazardWithAI(absoluteImagePath, description);
        const hazardType = aiResult.hazardType;
        const confidence = aiResult.confidence;

        // 2. Weather mapping
        const weatherSeverity = await getWeatherSeverity(latitude, longitude);

        // 3. User credibility
        const user = await User.findById(req.user._id);
        const userCredibility = user.credibilityScore || 50;

        // 4. Nearby reports calculation for risk
        const nearbyReportsCount = await Report.countDocuments({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 5000
                }
            }
        });

        // 5. Risk score calculation
        const { riskScore, riskLevel } = calculateRisk(
            confidence,
            weatherSeverity,
            userCredibility,
            nearbyReportsCount
        );

        const report = await Report.create({
            user: req.user._id,
            imageUrl: imagePath,
            description,
            hazardType,
            riskScore,
            riskLevel,
            aiConfidence: confidence,
            aiExplanation: aiResult.explanation || null,
            weatherSeverity,
            location: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }
        });

        if (global.io) {
            global.io.emit("new-report", report);

            // Trigger Smartathon Automated Alerting Layer
            checkAndEmitAlert(report, global.io, nearbyReportsCount);
        }

        res.status(201).json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 }).limit(100);
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getNearbyReports = async (req, res) => {
    try {
        const { lat, lng, distance = 5000 } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ message: "lat and lng required" });
        }

        const reports = await Report.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(distance)
                }
            }
        });

        res.json(reports);
    } catch (err) {
        console.error("Nearby Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

const confirmReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);

        if (!report) return res.status(404).json({ message: "Report not found" });

        report.confirmations += 1;

        if (report.confirmations >= 3 && report.status !== 'verified') {
            report.status = 'verified';
            await User.findByIdAndUpdate(report.user, { $inc: { credibilityScore: 1 } });
        }

        await report.save();

        if (global.io) {
            global.io.emit('report-updated', report);

            // Re-eval on confirmation bound
            checkAndEmitAlert(report, global.io, 0);
        }

        res.json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createReport, getReports, getNearbyReports, confirmReport };