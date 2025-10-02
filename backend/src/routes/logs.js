const express = require('express');
const router = express.Router();

// In-memory storage for MVP (replace with database later)
let logs = [];
let logId = 1;

// POST /api/logs - Receive security logs
router.post('/', (req, res) => {
  try {
    const logData = {
      id: logId++,
      ...req.body,
      receivedAt: new Date().toISOString(),
      processed: true
    };
    
    logs.push(logData);
    
    console.log('í³¨ Received security log:', {
      id: logData.id,
      eventType: logData.eventType,
      sourceIP: logData.sourceIPAddress,
      timestamp: logData.timestamp
    });
    
    res.json({ 
      success: true, 
      id: logData.id,
      message: 'Log ingested successfully'
    });
  } catch (error) {
    console.error('âŒ Error processing log:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/logs - Retrieve logs
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const recentLogs = logs.slice(-limit).reverse(); // Most recent first
  
  res.json({
    success: true,
    logs: recentLogs,
    total: logs.length,
    limit: limit
  });
});

// GET /api/logs/stats - Get log statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalLogs: logs.length,
    sources: {},
    eventTypes: {},
    recentActivity: logs.slice(-10)
  };
  
  logs.forEach(log => {
    const source = log.source || 'unknown';
    const eventType = log.eventType || 'unknown';
    
    stats.sources[source] = (stats.sources[source] || 0) + 1;
    stats.eventTypes[eventType] = (stats.eventTypes[eventType] || 0) + 1;
  });
  
  res.json({ success: true, stats });
});

module.exports = router;
