// Rule-based threat detection for Ethiopian context
class RuleEngine {
  constructor() {
    this.rules = [
      {
        name: 'Multiple Failed Logins',
        description: 'Detect multiple failed login attempts from same IP',
        condition: (log, context) => {
          return log.eventType === 'ConsoleLogin' && log.errorMessage?.includes('Failed');
        },
        severity: 'high'
      },
      {
        name: 'Unusual Hour Access',
        description: 'Access during unusual hours (10 PM - 5 AM)',
        condition: (log, context) => {
          const hour = new Date(log.eventTime).getHours();
          return (hour >= 22 || hour <= 5) && log.eventType === 'SignIn';
        },
        severity: 'medium'
      },
      {
        name: 'Ethiopian IP Threat',
        description: 'Known suspicious Ethiopian IP ranges',
        condition: (log, context) => {
          const suspiciousIPs = ['196.188.34.100', '196.188.34.101', '196.188.56.200'];
          return suspiciousIPs.includes(log.sourceIPAddress);
        },
        severity: 'high'
      },
      {
        name: 'Data Exfiltration',
        description: 'Large data transfer detected',
        condition: (log, context) => {
          return log.eventType === 'DataTransfer' && log.bytesTransferred > 1000000; // 1MB
        },
        severity: 'critical'
      }
    ];
  }

  async processLog(log) {
    console.log(`í´ Processing log: ${log.eventType} from ${log.source}`);
    
    for (const rule of this.rules) {
      if (rule.condition(log, this.getContext())) {
        console.log(`íº¨ Rule triggered: ${rule.name}`);
        return {
          ruleName: rule.name,
          message: `Rule triggered: ${rule.name}`,
          severity: rule.severity,
          logId: log.id,
          timestamp: new Date().toISOString()
        };
      }
    }
    return null;
  }

  getContext() {
    return {
      currentTime: new Date(),
      ethiopianBusinessHours: this.isEthiopianBusinessHours()
    };
  }

  isEthiopianBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 8 && hour <= 17;
  }
}

// Create instance
const ruleEngine = new RuleEngine();

// Export properly - NO RECURSION!
module.exports = ruleEngine;
