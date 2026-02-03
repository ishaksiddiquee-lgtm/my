const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the exam page
app.get('/exam', (req, res) => {
    res.sendFile(path.join(__dirname, 'exam.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Live Exam Portal is running at http://localhost:${PORT}`);
    console.log(`🎯 Access the application in your browser`);
    console.log(`💡 Press Ctrl+C to stop the server`);
});