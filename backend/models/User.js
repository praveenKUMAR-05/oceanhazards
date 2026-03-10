const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            select: false // Exclude password by default in queries
        },
        credibilityScore: {
            type: Number,
            default: 50
        },
        reportsSubmitted: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin', 'authority']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
