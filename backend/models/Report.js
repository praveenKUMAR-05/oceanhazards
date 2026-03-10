const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        image: {
            type: String
        },
        description: {
            type: String,
            required: [true, 'Please add a description of the hazard']
        },
        hazardType: {
            type: String,
            required: [true, 'Please specify the hazard type']
        },
        riskScore: {
            type: Number,
            default: 0
        },
        riskLevel: {
            type: String,
            enum: ['low', 'moderate', 'high'],
            default: 'low'
        },
        aiConfidence: {
            type: Number,
            default: 0
        },
        aiExplanation: {
            type: String
        },
        weatherSeverity: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['pending', 'verified', 'resolved'],
            default: 'pending'
        },
        confirmations: {
            type: Number,
            default: 0
        },
        imageUrl: {
            type: String
        },
        confidence: {
            type: Number,
            default: 0
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true // [longitude, latitude]
            }
        }
    },
    {
        timestamps: true
    }
);

// Create geospatial index for location-based queries
reportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Report', reportSchema);
