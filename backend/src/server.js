const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Simple CORS configuration that works
app.use(cors()); // This enables CORS for all routes

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '☕ BunaSIEM Backend API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Logs route
app.use('/api/logs', require('./routes/logs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` BunaSIEM backend running on http://localhost:${PORT}`);
  console.log(` API Health: http://localhost:${PORT}/`);
  console.log(` Frontend: http://localhost:5173/`);
  console.log(` CORS enabled for all origins`);
});
