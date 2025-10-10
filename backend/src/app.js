const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/logs');
const alertRoutes = require('./routes/alerts');
const dashboardRoutes = require('./routes/dashboard');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: ' BunaSIEM Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: ' BunaSIEM Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      logs: '/api/logs', 
      alerts: '/api/alerts',
      dashboard: '/api/dashboard'
    }
  });
});

// Error handling
app.use(errorHandler);

module.exports = app;
