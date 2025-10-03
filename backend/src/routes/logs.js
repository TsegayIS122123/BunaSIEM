const express = require('express');
const logIngestion = require('../services/logIngestion');
const router = express.Router();

// POST /api/logs - Receive security logs
router.post('/', async (req, res) => {
  try {
    const result = await logIngestion.ingestLog(req.body);
    
    if (result.success) {
      res.json({
        success: true,
        id: result.logId,
        hasAlert: result.hasAlert,
        alert: result.alert,
        message: 'Log ingested successfully'
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('❌ Error processing log:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/logs - Retrieve logs
router.get('/', async (req, res) => {
  try {
    const logs = await logIngestion.getLogs(req.query);
    res.json({
      success: true,
      logs: logs,
      total: logs.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/logs/stats - Get log statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await logIngestion.getLogStats();
    res.json({ 
      success: true, 
      stats 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// POST /api/logs/simulate - Generate sample logs (for testing)
router.post('/simulate', async (req, res) => {
  try {
    await logIngestion.simulateAWSCloudTrailLogs();
    await logIngestion.simulateAzureLogs();
    await logIngestion.simulateEthioTelecomLogs();
    
    res.json({
      success: true,
      message: 'Sample logs generated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;