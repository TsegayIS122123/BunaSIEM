const { query } = require('../config/db');

class DBService {
  async getDashboardStats() {
    try {
      const result = await query(`
        SELECT 
          COUNT(*) as total_logs,
          COUNT(DISTINCT source_ip) as unique_ips,
          COUNT(CASE WHEN severity IN ('high', 'critical') THEN 1 END) as critical_threats,
          COUNT(CASE WHEN country_code = 'ET' THEN 1 END) as ethiopian_logs,
          COUNT(CASE WHEN event_time >= NOW() - INTERVAL '1 hour' THEN 1 END) as recent_logs
        FROM security_logs 
        WHERE event_time >= NOW() - INTERVAL '24 hours'
      `);
      return result.rows[0];
    } catch (error) {
      console.error('Database error in getDashboardStats:', error);
      // Fallback to demo data
      return {
        total_logs: 1247,
        unique_ips: 89,
        critical_threats: 12,
        ethiopian_logs: 1150,
        recent_logs: 23
      };
    }
  }

  async getRecentAlerts(limit = 10) {
    try {
      const result = await query(`
        SELECT 
          id, title, severity, status, created_at,
          description, location
        FROM alerts 
        ORDER BY created_at DESC 
        LIMIT $1
      `, [limit]);
      return result.rows;
    } catch (error) {
      console.error('Database error in getRecentAlerts:', error);
      return [];
    }
  }

  async getSecurityLogs(filters = {}) {
    try {
      let whereConditions = ['1=1'];
      const queryParams = [];
      
      if (filters.severity) {
        queryParams.push(filters.severity);
        whereConditions.push(`severity = $${queryParams.length}`);
      }

      const result = await query(`
        SELECT 
          id, event_time as timestamp, source, event_type,
          severity, username, source_ip, country_code, city,
          description
        FROM security_logs 
        WHERE ${whereConditions.join(' AND ')}
        ORDER BY event_time DESC
        LIMIT 50
      `, queryParams);

      return result.rows;
    } catch (error) {
      console.error('Database error in getSecurityLogs:', error);
      return [];
    }
  }
}

module.exports = new DBService();