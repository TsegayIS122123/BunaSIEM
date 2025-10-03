const ruleEngine = require('./ruleEngine');

// In-memory storage (replace with PostgreSQL later)
let securityLogs = [];
let alertId = 1;

class LogIngestionService {
  
  // Ingest logs from various sources
  async ingestLog(logData) {
    try {
      const enrichedLog = {
        id: securityLogs.length + 1,
        ...logData,
        ingestedAt: new Date().toISOString(),
        processed: false,
        source: logData.source || 'unknown'
      };

      // Process through rule engine for threat detection
      const alert = await ruleEngine.processLog(enrichedLog);
      
      if (alert) {
        enrichedLog.alertId = alertId++;
        enrichedLog.hasAlert = true;
        console.log(`🚨 ALERT: ${alert.message} - Severity: ${alert.severity}`);
      }

      // Store the log
      securityLogs.push(enrichedLog);
      
      // Keep only last 10,000 logs for memory management
      if (securityLogs.length > 10000) {
        securityLogs = securityLogs.slice(-5000);
      }

      console.log(`Log ingested: ${enrichedLog.source} - ${enrichedLog.eventType}`);
      
      return {
        success: true,
        logId: enrichedLog.id,
        hasAlert: !!alert,
        alert: alert
      };

    } catch (error) {
      console.error(' Log ingestion error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all logs with filtering
  async getLogs(filters = {}) {
    let filteredLogs = [...securityLogs];
    
    if (filters.source) {
      filteredLogs = filteredLogs.filter(log => log.source === filters.source);
    }
    
    if (filters.severity) {
      filteredLogs = filteredLogs.filter(log => log.severity === filters.severity);
    }
    
    if (filters.hasAlert) {
      filteredLogs = filteredLogs.filter(log => log.hasAlert);
    }

    // Most recent first
    filteredLogs.sort((a, b) => new Date(b.ingestedAt) - new Date(a.ingestedAt));
    
    const limit = filters.limit || 100;
    return filteredLogs.slice(0, limit);
  }

  // Get log statistics
  async getLogStats() {
    const stats = {
      totalLogs: securityLogs.length,
      sources: {},
      eventTypes: {},
      alerts: securityLogs.filter(log => log.hasAlert).length,
      recentLogs: securityLogs.slice(-10)
    };

    securityLogs.forEach(log => {
      const source = log.source || 'unknown';
      const eventType = log.eventType || 'unknown';

      stats.sources[source] = (stats.sources[source] || 0) + 1;
      stats.eventTypes[eventType] = (stats.eventTypes[eventType] || 0) + 1;
    });

    return stats;
  }

  // Simulate AWS CloudTrail logs
  async simulateAWSCloudTrailLogs() {
    const awsLogs = [
      {
        source: 'AWS CloudTrail',
        eventType: 'ConsoleLogin',
        user: 'admin@bunasiem.et',
        sourceIPAddress: '196.188.34.' + Math.floor(Math.random() * 255),
        eventTime: new Date().toISOString(),
        severity: 'low'
      },
      {
        source: 'AWS CloudTrail',
        eventType: 'DeleteSecurityGroup',
        user: 'admin@bunasiem.et',
        sourceIPAddress: '196.188.34.' + Math.floor(Math.random() * 255),
        eventTime: new Date().toISOString(),
        severity: 'high'
      }
    ];

    for (const log of awsLogs) {
      await this.ingestLog(log);
    }
  }

  // Simulate Azure Monitor logs
  async simulateAzureLogs() {
    const azureLogs = [
      {
        source: 'Azure Monitor',
        eventType: 'SignIn',
        user: 'tsegay@bunasiem.et',
        sourceIPAddress: '196.188.56.' + Math.floor(Math.random() * 255),
        eventTime: new Date().toISOString(),
        severity: 'medium'
      }
    ];

    for (const log of azureLogs) {
      await this.ingestLog(log);
    }
  }

  // Simulate Ethiopian telecom logs
  async simulateEthioTelecomLogs() {
    const ethioLogs = [
      {
        source: 'Ethio Telecom',
        eventType: 'NetworkAccess',
        user: 'user@ethiotelecom.et',
        sourceIPAddress: '10.10.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
        eventTime: new Date().toISOString(),
        severity: 'low',
        location: 'Addis Ababa'
      }
    ];

    for (const log of ethioLogs) {
      await this.ingestLog(log);
    }
  }
}

module.exports = new LogIngestionService();