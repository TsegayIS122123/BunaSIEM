import React from 'react'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, Clock, MapPin, User, ExternalLink } from 'lucide-react'

const RecentAlerts = ({ alerts = [] }) => {
  const { t } = useTranslation()

  // Sample data if no alerts provided
  const sampleAlerts = [
    {
      id: 1,
      type: 'multiple_failed_logins',
      title: 'Multiple Failed Login Attempts',
      description: '15 failed login attempts from IP 197.156.64.25',
      severity: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      ip: '197.156.64.25',
      location: 'Addis Ababa, Ethiopia',
      user: 'admin',
      status: 'new'
    },
    {
      id: 2,
      type: 'unusual_data_transfer',
      title: 'Unusual Data Transfer',
      description: '2GB download to external IP address',
      severity: 'medium',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      ip: '45.67.89.123',
      location: 'Foreign IP',
      user: 'user123',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'suspicious_file_access',
      title: 'Suspicious File Access',
      description: 'Access to sensitive financial documents',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      ip: '197.156.78.90',
      location: 'Addis Ababa, Ethiopia',
      user: 'finance_user',
      status: 'new'
    }
  ]

  const displayAlerts = alerts.length > 0 ? alerts : sampleAlerts

  const getSeverityStyles = (severity) => {
    const styles = {
      high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100 text-red-800' },
      medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-100 text-yellow-800' },
      low: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-800' }
    }
    return styles[severity] || styles.low
  }

  const getStatusStyles = (status) => {
    const styles = {
      new: 'bg-green-100 text-green-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-gray-100 text-gray-800'
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('alerts.recentAlerts', 'Recent Security Alerts')}
            </h2>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            {displayAlerts.length} Active
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {displayAlerts.map((alert) => {
          const severityStyles = getSeverityStyles(alert.severity)
          
          return (
            <div
              key={alert.id}
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${severityStyles.bg} ${severityStyles.border}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`font-semibold ${severityStyles.text}`}>
                      {alert.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityStyles.badge}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{alert.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(alert.timestamp)}</span>
                    </div>
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
        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          {t('alerts.viewAllAlerts', 'View All Security Alerts')} →
        </button>
      </div>
    </div>
  )
}

export default RecentAlerts