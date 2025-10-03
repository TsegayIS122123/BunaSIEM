const express = require('express');
const router = express.Router();

// GET /api/dashboard/stats - For StatsGrid.jsx
router.get('/stats', (req, res) => {
  res.json({
    totalAlerts: 24,
    highSeverity: 8,
    incidentsResolved: 18,
    activeThreats: 6,
    totalLogs: 12543,
    suspiciousActivities: 12,
    uptime: '99.8%',
    protectedAssets: 156
  });
});

// GET /api/dashboard/recent-alerts - For RecentAlerts.jsx
router.get('/recent-alerts', (req, res) => {
  res.json([
    {
      id: 1,
      severity: 'high',
      message: 'Multiple failed login attempts from new IP in Addis Ababa',
      source: 'AWS CloudTrail',
      timestamp: new Date().toISOString(),
      status: 'new'
    },
    {
      id: 2,
      severity: 'medium', 
      message: 'Unusual data transfer pattern detected',
      source: 'Azure Monitor',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'investigating'
    },
    {
      id: 3,
      severity: 'low',
      message: 'Suspicious user agent detected',
      source: 'Web Application',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'resolved'
    }
  ]);
});

// GET /api/dashboard/threat-map - For ThreatMap.jsx
router.get('/threat-map', (req, res) => {
  res.json([
    { location: 'Addis Ababa', count: 8, severity: 'high', lat: 9.03, lng: 38.74 },
    { location: 'Dire Dawa', count: 3, severity: 'medium', lat: 9.59, lng: 41.87 },
    { location: 'Hawassa', count: 2, severity: 'low', lat: 7.05, lng: 38.47 },
    { location: 'Mekele', count: 1, severity: 'low', lat: 13.49, lng: 39.47 },
    { location: 'Bahir Dar', count: 4, severity: 'medium', lat: 11.59, lng: 37.39 }
  ]);
});

// GET /api/dashboard/activity - For activity timeline
router.get('/activity', (req, res) => {
  res.json([
    { time: '2 mins ago', event: 'New high severity alert', type: 'alert' },
    { time: '5 mins ago', event: 'User login from new device', type: 'auth' },
    { time: '15 mins ago', event: 'System backup completed', type: 'system' },
    { time: '1 hour ago', event: 'Threat intelligence updated', type: 'update' }
  ]);
});

module.exports = router;
