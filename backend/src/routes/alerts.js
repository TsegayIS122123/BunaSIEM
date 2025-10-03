const express = require('express');
const router = express.Router();

// In-memory storage for MVP
let alerts = [
  {
    id: 1,
    title: 'Multiple Failed Logins',
    description: '5 failed login attempts from IP 196.188.34.12',
    severity: 'high',
    status: 'open',
    source: 'AWS CloudTrail',
    timestamp: new Date().toISOString(),
    location: 'Addis Ababa'
  },
  {
    id: 2,
    title: 'Unusual Data Transfer',
    description: 'Large data transfer detected during off-hours',
    severity: 'medium',
    status: 'investigating',
    source: 'Azure Monitor',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: 'Dire Dawa'
  }
];

// GET /api/alerts - Get all alerts
router.get('/', (req, res) => {
  const { status, severity } = req.query;
  
  let filteredAlerts = alerts;
  
  if (status) {
    filteredAlerts = filteredAlerts.filter(alert => alert.status === status);
  }
  
  if (severity) {
    filteredAlerts = filteredAlerts.filter(alert => alert.severity === severity);
  }
  
  res.json({
    success: true,
    alerts: filteredAlerts,
    total: filteredAlerts.length
  });
});

// PUT /api/alerts/:id - Update alert status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const alertIndex = alerts.findIndex(alert => alert.id === parseInt(id));
  
  if (alertIndex === -1) {
    return res.status(404).json({ success: false, message: 'Alert not found' });
  }
  
  alerts[alertIndex].status = status;
  
  res.json({
    success: true,
    alert: alerts[alertIndex]
  });
});

module.exports = router;
