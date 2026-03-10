require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { Server } = require("socket.io");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Import routes
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: false }));

// Expose the uploads folder as static
// Note: Create the uploads directory if it doesn't exist
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// Base route test
app.get('/', (req, res) => {
    res.send('OceanShield API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Setup Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // standard vite dev server
        methods: ["GET", "POST"]
    }
});

// Configure Global IO variable
global.io = io;

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
