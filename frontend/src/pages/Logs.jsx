import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Filter, Download, Eye, Calendar, User, MapPin, AlertTriangle } from 'lucide-react'
import { logsAPI } from '../services/api'
import useWebSocket from '../hooks/useWebSocket'

const Logs = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch real logs from backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true)
        const response = await logsAPI.getLogs()
        if (response.data.success) {
          setLogs(response.data.logs)
        }
      } catch (err) {
        console.error('Error fetching logs:', err)
        setError('Failed to load logs. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  // Generate sample logs if no real logs available
  const generateSampleLogs = () => {
    const sampleLogs = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        source: 'AWS CloudTrail',
        eventType: 'ConsoleLogin',
        user: 'admin@bunasiem.et',
        ip: '196.188.34.142',
        location: 'Addis Ababa, ET',
        severity: 'low',
        description: 'User login successful'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        source: 'Azure Monitor',
        eventType: 'SignIn',
        user: 'tsegay@bunasiem.et',
        ip: '196.188.56.214',
        location: 'Addis Ababa, ET',
        severity: 'medium',
        description: 'Unusual hour access detected',
        hasAlert: true
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        source: 'Ethio Telecom',
        eventType: 'NetworkAccess',
        user: 'user@ethiotelecom.et',
        ip: '10.10.129.225',
        location: 'Addis Ababa, ET',
        severity: 'low',
        description: 'Network access from corporate office'
      }
    ]
    return sampleLogs
  }

  // Use real logs or fallback to samples
  const displayLogs = logs.length > 0 ? logs : generateSampleLogs()

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      low: 'bg-green-100 text-green-800 border border-green-200',
      critical: 'bg-purple-100 text-purple-800 border border-purple-200'
    }
    return colors[severity] || colors.low
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A'
    
    try {
      if (typeof timestamp === 'string') {
        return new Date(timestamp).toLocaleTimeString()
      }
      // Handle Date objects or timestamps
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
      return date.toLocaleTimeString()
    } catch (error) {
      console.error('Error formatting timestamp:', error)
      return 'Invalid Date'
    }
  }

  const filteredLogs = displayLogs.filter(log => {
    const matchesSearch = log.eventType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity
    
    return matchesSearch && matchesSeverity
  })

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading security logs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('logs.title', 'Security Logs')}</h1>        
          <p className="text-gray-600">
            {logs.length > 0 
              ? `Monitoring ${logs.length} security events in real-time` 
              : 'Monitor and analyze security events in real-time'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={async () => {
              try {
                await logsAPI.simulateLogs()
                // Refresh logs after simulation
                const response = await logsAPI.getLogs()
                if (response.data.success) {
                  setLogs(response.data.logs)
                }
              } catch (err) {
                console.error('Error simulating logs:', err)
              }
            }}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>Generate Sample Logs</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatTimestamp(log.timestamp ?? log.ingestedAt ?? log.eventTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.source}</td>     
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.eventType}</div>
                      <div className="text-sm text-gray-500">{log.description}</div>
                      {log.hasAlert && (
                        <div className="flex items-center space-x-1 mt-1">
                          <AlertTriangle className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-yellow-600">Alert Triggered</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{log.sourceIPAddress || log.ip}</div>
                        <div className="text-xs text-gray-500">{log.location || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">    
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Logs