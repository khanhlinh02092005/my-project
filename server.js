const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9999;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'src')));
app.use('/static', express.static(path.join(__dirname, 'src/static')));

// API Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/services', require('./backend/routes/services'));
app.use('/api/queue', require('./backend/routes/queue'));
app.use('/api/feedback', require('./backend/routes/feedback'));

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/templates/login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/templates/dashboard.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/templates/service-management.html'));
});

app.get('/queue', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/templates/queue.html'));
});

app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/templates/feedback.html'));
});

// Handle 404
app.use('*', (req, res) => {
    if (req.originalUrl.startsWith('/api/')) {
        res.status(404).json({ success: false, message: 'API endpoint not found' });
    } else {
        res.sendFile(path.join(__dirname, 'src/templates/login.html'));
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
    console.log(`🔐 Login: http://localhost:${PORT}/`);
    console.log(`🛠️ Services: http://localhost:${PORT}/services`);
    console.log(`📋 Queue: http://localhost:${PORT}/queue`);
    console.log(`💬 Feedback: http://localhost:${PORT}/feedback`);
});
