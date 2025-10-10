const express = require('express');
const { Alert } = require('../models');
const router = express.Router();

// GET /api/alerts - Get all alerts FROM DATABASE
router.get('/', async (req, res) => {
  try {
    const { status, severity } = req.query;
    
    // Build where clause for filtering
    const where = {};
    if (status) where.status = status;
    if (severity) where.severity = severity;

    const alerts = await Alert.findAll({ 
      where,
      order: [['created_at', 'DESC']] // Show newest first
    });

    res.json({
      success: true,
      alerts: alerts,
      total: alerts.length
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch alerts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/alerts/:id - Update alert status IN DATABASE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const alert = await Alert.findByPk(id);
    if (!alert) {
      return res.status(404).json({ 
        success: false, 
        message: 'Alert not found' 
      });
    }

    alert.status = status;
    alert.updated_at = new Date();
    await alert.save();

    res.json({
      success: true,
      alert: alert
    });
  } catch (error) {
    console.error('Error updating alert:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update alert',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;