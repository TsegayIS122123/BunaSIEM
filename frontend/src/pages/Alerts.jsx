import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, Filter, Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'

const Alerts = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const sampleAlerts = [
    {
      id: 1,
      title: 'Multiple Failed Login Attempts',
      description: '15 failed login attempts from IP 197.156.64.25 within 10 minutes',
      severity: 'high',
      status: 'new',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      source: 'AWS CloudTrail',
      ip: '197.156.64.25',
      user: 'admin'
    },
    {
      id: 2,
      title: 'Unusual Data Transfer',
      description: '2GB download to external IP address during non-business hours',
      severity: 'medium',
      status: 'investigating',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      source: 'Azure Monitor',
      ip: '45.67.89.123',
      user: 'user123'
    },
    {
      id: 3,
      title: 'Suspicious File Access',
      description: 'Access to sensitive financial documents from unrecognized device',
      severity: 'high',
      status: 'new',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      source: 'Ethio Telecom',
      ip: '197.156.78.90',
      user: 'finance_user'
    }
  ]

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return colors[severity] || colors.low
  }

  const getStatusIcon = (status) => {
    const icons = {
      new: Clock,
      investigating: Eye,
      resolved: CheckCircle
    }
    return icons[status] || Clock
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'text-blue-600 bg-blue-100',
      investigating: 'text-yellow-600 bg-yellow-100',
      resolved: 'text-green-600 bg-green-100'
    }
    return colors[status] || colors.new
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('alerts.title', 'Security Alerts')}</h1>
          <p className="text-gray-600">Monitor and manage security alerts in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            {sampleAlerts.length} Active Alerts
          </span>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Alert Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{sampleAlerts.length}</div>
              <div className="text-sm text-gray-500">Total Alerts</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {sampleAlerts.filter(a => a.severity === 'high').length}
              </div>
              <div className="text-sm text-gray-500">High Severity</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {sampleAlerts.filter(a => a.status === 'new').length}
              </div>
              <div className="text-sm text-gray-500">New Alerts</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {sampleAlerts.filter(a => a.status === 'investigating').length}
              </div>
              <div className="text-sm text-gray-500">Investigating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Alerts</option>
                <option value="high">High Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="new">New Alerts</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {sampleAlerts.map((alert) => {
            const StatusIcon = getStatusIcon(alert.status)
            return (
              <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        <StatusIcon className="h-3 w-3 inline mr-1" />
                        {alert.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{alert.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Source:</span> {alert.source}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {alert.ip}
                      </div>
                      <div>
                        <span className="font-medium">User:</span> {alert.user}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Alerts