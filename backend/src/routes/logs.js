const express = require('express');
const { Log } = require('../models');
const router = express.Router();

// GET /api/logs - Retrieve logs FROM DATABASE
router.get('/', async (req, res) => {
  try {
    const logs = await Log.findAll({
      order: [['created_at', 'DESC']],
      limit: 100
    });

    res.json({
      success: true,
      logs: logs,
      total: logs.length
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.json({
      success: true,
      logs: [],
      total: 0
    });
  }
});

// POST /api/logs - Simple log ingestion
router.post('/', async (req, res) => {
  try {
    const logData = req.body;
    
    // Create log in database
    const log = await Log.create({
      source: logData.source || 'unknown',
      event_type: logData.event_type || 'unknown',
      severity: logData.severity || 'low',
      username: logData.username,
      source_ip: logData.source_ip,
      description: logData.description,
      raw_log: logData,
      event_time: logData.timestamp ? new Date(logData.timestamp) : new Date()
    });

    res.json({
      success: true,
      id: log.id,
      message: 'Log ingested successfully'
    });
  } catch (error) {
    console.error('Error ingesting log:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/logs/stats - Simple log statistics
router.get('/stats', async (req, res) => {
  try {
    const totalLogs = await Log.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayLogs = await Log.count({
      where: {
        created_at: {
          [Op.gte]: today
        }
      }
    });

    res.json({
      success: true,
      stats: {
        total: totalLogs,
        today: todayLogs,
        bySource: {
          aws_cloudtrail: await Log.count({ where: { source: 'aws_cloudtrail' } }),
          azure_monitor: await Log.count({ where: { source: 'azure_monitor' } })
        }
      }
    });
  } catch (error) {
    res.json({
      success: true,
      stats: {
        total: 0,
        today: 0,
        bySource: {}
      }
    });
  }
});

// POST /api/logs/simulate - Create sample logs in database
router.post('/simulate', async (req, res) => {
  try {
    // Create some sample logs in database
    const sampleLogs = [
      {
        source: 'aws_cloudtrail',
        event_type: 'ConsoleLogin',
        severity: 'low',
        username: 'admin@bunasiem.et',
        source_ip: '196.188.34.142',
        description: 'Successful login from Addis Ababa office',
        country_code: 'ET',
        city: 'Addis Ababa'
      },
      {
        source: 'azure_monitor',
        event_type: 'SignIn',
        severity: 'medium', 
        username: 'user@organization.et',
        source_ip: '197.156.78.150',
        description: 'Login outside business hours',
        country_code: 'ET',
        city: 'Dire Dawa'
      }
    ];

    for (const logData of sampleLogs) {
      await Log.create({
        ...logData,
        raw_log: logData,
        event_time: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Sample logs created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;