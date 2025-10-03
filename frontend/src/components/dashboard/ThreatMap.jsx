import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  MapPin, 
  Shield, 
  Network, 
  Globe, 
  AlertTriangle, 
  Activity,
  TrendingUp,
  Clock,
  Play,
  Eye
} from 'lucide-react'

const ThreatMap = ({ threats = [] }) => {
  const { t } = useTranslation()

  // Enhanced threat data with more details
  const sampleThreats = [
    { 
      id: 1, 
      location: 'Addis Ababa', 
      country: 'Ethiopia', 
      type: 'brute_force', 
      severity: 'high', 
      count: 15, 
      coordinates: { x: 50, y: 60 },
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      status: 'active'
    },
    { 
      id: 2, 
      location: 'Dire Dawa', 
      country: 'Ethiopia', 
      type: 'malware', 
      severity: 'medium', 
      count: 8, 
      coordinates: { x: 55, y: 55 },
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      status: 'contained'
    },
    { 
      id: 3, 
      location: 'Nairobi', 
      country: 'Kenya', 
      type: 'phishing', 
      severity: 'high', 
      count: 12, 
      coordinates: { x: 60, y: 70 },
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'monitoring'
    },
    { 
      id: 4, 
      location: 'Khartoum', 
      country: 'Sudan', 
      type: 'ddos', 
      severity: 'medium', 
      count: 6, 
      coordinates: { x: 45, y: 40 },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'resolved'
    },
    { 
      id: 5, 
      location: 'Djibouti', 
      country: 'Djibouti', 
      type: 'scanning', 
      severity: 'low', 
      count: 3, 
      coordinates: { x: 65, y: 50 },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      status: 'resolved'
    },
    { 
      id: 6, 
      location: 'Mogadishu', 
      country: 'Somalia', 
      type: 'malware', 
      severity: 'high', 
      count: 10, 
      coordinates: { x: 70, y: 65 },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      status: 'investigating'
    }
  ]

  const displayThreats = threats.length > 0 ? threats : sampleThreats

  // Threat statistics
  const threatStats = {
    total: displayThreats.length,
    highSeverity: displayThreats.filter(t => t.severity === 'high').length,
    domestic: displayThreats.filter(t => t.country === 'Ethiopia').length,
    international: displayThreats.filter(t => t.country !== 'Ethiopia').length,
    active: displayThreats.filter(t => t.status === 'active').length,
    recent: displayThreats.filter(t => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      return new Date(t.timestamp) > oneHourAgo
    }).length
  }

  const getThreatTypeIcon = (type) => {
    const icons = {
      brute_force: Shield,
      malware: AlertTriangle,
      phishing: Network,
      ddos: Globe,
      scanning: MapPin
    }
    return icons[type] || Shield
  }

  const getSeveritySize = (severity) => {
    const sizes = {
      high: 'w-10 h-10',
      medium: 'w-7 h-7',
      low: 'w-5 h-5'
    }
    return sizes[severity] || sizes.medium
  }

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-500 border-red-600 shadow-lg shadow-red-200',
      medium: 'bg-yellow-500 border-yellow-600 shadow-lg shadow-yellow-200',
      low: 'bg-blue-500 border-blue-600 shadow-lg shadow-blue-200'
    }
    return colors[severity] || colors.medium
  }

  const getThreatTypeColor = (type) => {
    const colors = {
      brute_force: 'text-red-600 bg-red-50',
      malware: 'text-yellow-600 bg-yellow-50',
      phishing: 'text-purple-600 bg-purple-50',
      ddos: 'text-orange-600 bg-orange-50',
      scanning: 'text-blue-600 bg-blue-50'
    }
    return colors[type] || colors.brute_force
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-red-100 text-red-800 border border-red-200',
      investigating: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      monitoring: 'bg-purple-100 text-purple-800 border border-purple-200',
      contained: 'bg-blue-100 text-blue-800 border border-blue-200',
      resolved: 'bg-green-100 text-green-800 border border-green-200'
    }
    return colors[status] || colors.active
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
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('threats.liveThreatMap', 'Live Threat Intelligence')}
              </h2>
              <p className="text-sm text-gray-500">
                {threatStats.total} active threats • {threatStats.highSeverity} critical • {threatStats.recent} recent
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Map Visualization */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-blue-200 h-80 mb-6 overflow-hidden">
          {/* Ethiopia Outline with better styling */}
          <div className="absolute inset-8 bg-green-50 border-2 border-green-300 rounded-xl shadow-sm">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-800 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
              🇪🇹 Ethiopia
            </div>
          </div>
          
          {/* Surrounding Countries */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-gray-100 border border-gray-300 rounded-lg opacity-60"></div>
          <div className="absolute top-4 right-4 w-20 h-16 bg-gray-100 border border-gray-300 rounded-lg opacity-60"></div>
          <div className="absolute bottom-4 left-8 w-14 h-14 bg-gray-100 border border-gray-300 rounded-lg opacity-60"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg opacity-60"></div>
          
          {/* Threat Indicators with enhanced animation */}
          {displayThreats.map((threat) => {
            const ThreatIcon = getThreatTypeIcon(threat.type)
            const isActive = threat.status === 'active'
            
            return (
              <div
                key={threat.id}
                className={`absolute ${getSeveritySize(threat.severity)} ${getSeverityColor(threat.severity)} rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  isActive ? 'animate-pulse' : 'opacity-80'
                }`}
                style={{
                  left: `${threat.coordinates.x}%`,
                  top: `${threat.coordinates.y}%`
                }}
                title={`${threat.location}, ${threat.country}\n${threat.type.replace('_', ' ')} - ${threat.count} incidents\nStatus: ${threat.status}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <ThreatIcon className="h-4 w-4 text-white" />
                </div>
                {isActive && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Enhanced Threat Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Types */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-gray-600" />
              {t('threats.activeThreats', 'Active Threats by Region')}
            </h3>
            <div className="space-y-3">
              {displayThreats.map((threat) => {
                const ThreatIcon = getThreatTypeIcon(threat.type)
                return (
                  <div key={threat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getThreatTypeColor(threat.type)}`}>
                        <ThreatIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">{threat.type.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {threat.location}, {threat.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(threat.status)}`}>
                        {threat.status}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900 block">{threat.count}</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(threat.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Threat Summary & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-gray-600" />
                Threat Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Threats</span>
                  <span className="font-semibold text-gray-900">{threatStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">High Severity</span>
                  <span className="font-semibold text-red-600">{threatStats.highSeverity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Domestic</span>
                  <span className="font-semibold text-green-600">{threatStats.domestic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">International</span>
                  <span className="font-semibold text-orange-600">{threatStats.international}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Now</span>
                  <span className="font-semibold text-red-600">{threatStats.active}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-ethiopia-green text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                  <Play className="h-4 w-4" />
                  <span>Scan Network</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  <Shield className="h-4 w-4" />
                  <span>Update Firewall</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>View Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatMap