import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  ExternalLink, 
  Shield, 
  Network, 
  FileWarning,
  UserX,
  Search,
  Play
} from 'lucide-react'

const RecentAlerts = ({ alerts = [] }) => {
  const { t } = useTranslation()

  // Enhanced sample data with more security scenarios
  const sampleAlerts = [
    {
      id: 1,
      type: 'brute_force',
      title: 'Brute Force Attack Detected',
      description: '45 failed SSH login attempts from IP 197.156.64.25 within 5 minutes',
      severity: 'critical',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      ip: '197.156.64.25',
      location: 'Addis Ababa, Ethiopia',
      user: 'N/A',
      status: 'new',
      icon: UserX
    },
    {
      id: 2,
      type: 'data_exfiltration',
      title: 'Large Data Transfer to External IP',
      description: '2.4GB download to suspicious external IP address 45.67.89.123',
      severity: 'high',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      ip: '45.67.89.123',
      location: 'Unknown Location',
      user: 'user123',
      status: 'investigating',
      icon: Network
    },
    {
      id: 3,
      type: 'malware_detection',
      title: 'Malware Signature Detected',
      description: 'Suspicious executable file detected on finance department workstation',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      ip: '197.156.78.90',
      location: 'Addis Ababa, Ethiopia',
      user: 'finance_user',
      status: 'new',
      icon: Shield
    },
    {
      id: 4,
      type: 'port_scanning',
      title: 'Port Scanning Activity',
      description: 'Multiple port scan attempts detected from external IP 198.51.100.23',
      severity: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      ip: '198.51.100.23',
      location: 'Foreign IP',
      user: 'N/A',
      status: 'monitoring',
      icon: Search
    },
    {
      id: 5,
      type: 'policy_violation',
      title: 'Security Policy Violation',
      description: 'Unauthorized access attempt to restricted HR documents folder',
      severity: 'medium',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      ip: '197.156.88.77',
      location: 'Addis Ababa, Ethiopia',
      user: 'marketing_user',
      status: 'resolved',
      icon: FileWarning
    }
  ]

  const displayAlerts = alerts.length > 0 ? alerts : sampleAlerts

  const getSeverityStyles = (severity) => {
    const styles = {
      critical: { 
        bg: 'bg-red-50', 
        border: 'border-red-200', 
        text: 'text-red-800', 
        badge: 'bg-red-100 text-red-800 border border-red-200',
        icon: 'text-red-600'
      },
      high: { 
        bg: 'bg-orange-50', 
        border: 'border-orange-200', 
        text: 'text-orange-800', 
        badge: 'bg-orange-100 text-orange-800 border border-orange-200',
        icon: 'text-orange-600'
      },
      medium: { 
        bg: 'bg-yellow-50', 
        border: 'border-yellow-200', 
        text: 'text-yellow-800', 
        badge: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        icon: 'text-yellow-600'
      },
      low: { 
        bg: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-800', 
        badge: 'bg-blue-100 text-blue-800 border border-blue-200',
        icon: 'text-blue-600'
      }
    }
    return styles[severity] || styles.low
  }

  const getStatusStyles = (status) => {
    const styles = {
      new: 'bg-green-100 text-green-800 border border-green-200',
      investigating: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      monitoring: 'bg-purple-100 text-purple-800 border border-purple-200',
      resolved: 'bg-gray-100 text-gray-800 border border-gray-200'
    }
    return styles[status] || styles.new
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return timestamp.toLocaleDateString()
  }

  const getAlertCountBySeverity = () => {
    const critical = displayAlerts.filter(a => a.severity === 'critical').length
    const high = displayAlerts.filter(a => a.severity === 'high').length
    return { critical, high }
  }

  const { critical, high } = getAlertCountBySeverity()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('alerts.recentAlerts', 'Recent Security Alerts')}
              </h2>
              <p className="text-sm text-gray-500">
                {displayAlerts.length} total alerts • {critical} critical • {high} high priority
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200">
              {critical} Critical
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {displayAlerts.map((alert) => {
          const severityStyles = getSeverityStyles(alert.severity)
          const AlertIcon = alert.icon
          
          return (
            <div
              key={alert.id}
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${severityStyles.bg} ${severityStyles.border}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${severityStyles.bg}`}>
                      <AlertIcon className={`h-4 w-4 ${severityStyles.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-semibold text-sm ${severityStyles.text}`}>
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityStyles.badge}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(alert.status)}`}>
                          {alert.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{alert.user}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {alert.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 mt-3">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-ethiopia-green text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                      <Play className="h-3 w-3" />
                      <span>Investigate</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      <Shield className="h-3 w-3" />
                      <span>Contain</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      <span>Ignore</span>
                    </button>
                  </div>
                </div>
                
                <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button className="w-full text-center text-ethiopia-green hover:text-green-700 font-medium text-sm flex items-center justify-center">
          {t('alerts.viewAllAlerts', 'View All Security Alerts')}
          <ExternalLink className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default RecentAlerts