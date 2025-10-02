import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Shield, Network, Globe, AlertTriangle } from 'lucide-react'

const ThreatMap = ({ threats = [] }) => {
  const { t } = useTranslation()

  // Sample threat data focused on Ethiopia and surrounding regions
  const sampleThreats = [
    { id: 1, location: 'Addis Ababa', country: 'Ethiopia', type: 'brute_force', severity: 'high', count: 15, coordinates: { x: 50, y: 60 } },
    { id: 2, location: 'Dire Dawa', country: 'Ethiopia', type: 'malware', severity: 'medium', count: 8, coordinates: { x: 55, y: 55 } },
    { id: 3, location: 'Nairobi', country: 'Kenya', type: 'phishing', severity: 'high', count: 12, coordinates: { x: 60, y: 70 } },
    { id: 4, location: 'Khartoum', country: 'Sudan', type: 'ddos', severity: 'medium', count: 6, coordinates: { x: 45, y: 40 } },
    { id: 5, location: 'Djibouti', country: 'Djibouti', type: 'scanning', severity: 'low', count: 3, coordinates: { x: 65, y: 50 } },
    { id: 6, location: 'Mogadishu', country: 'Somalia', type: 'malware', severity: 'high', count: 10, coordinates: { x: 70, y: 65 } }
  ]

  const displayThreats = threats.length > 0 ? threats : sampleThreats

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
      high: 'w-8 h-8',
      medium: 'w-6 h-6',
      low: 'w-4 h-4'
    }
    return sizes[severity] || sizes.medium
  }

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-500 border-red-600',
      medium: 'bg-yellow-500 border-yellow-600',
      low: 'bg-blue-500 border-blue-600'
    }
    return colors[severity] || colors.medium
  }

  const getThreatTypeColor = (type) => {
    const colors = {
      brute_force: 'text-red-600',
      malware: 'text-yellow-600',
      phishing: 'text-purple-600',
      ddos: 'text-orange-600',
      scanning: 'text-blue-600'
    }
    return colors[type] || colors.brute_force
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('threats.liveThreatMap', 'Live Threat Map')}
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
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
        {/* Simplified Map Visualization */}
        <div className="relative bg-blue-50 rounded-lg border border-blue-200 h-64 mb-6 overflow-hidden">
          {/* Ethiopia Outline */}
          <div className="absolute inset-10 bg-green-100 border-2 border-green-300 rounded-lg">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-800 text-sm font-semibold">
              Ethiopia
            </div>
          </div>
          
          {/* Threat Indicators */}
          {displayThreats.map((threat) => {
            const ThreatIcon = getThreatTypeIcon(threat.type)
            return (
              <div
                key={threat.id}
                className={`absolute ${getSeveritySize(threat.severity)} ${getSeverityColor(threat.severity)} rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse cursor-pointer`}
                style={{
                  left: `${threat.coordinates.x}%`,
                  top: `${threat.coordinates.y}%`
                }}
                title={`${threat.location}, ${threat.country} - ${threat.type} (${threat.count} incidents)`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <ThreatIcon className="h-3 w-3 text-white" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Threat Legend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {t('threats.activeThreats', 'Active Threats by Type')}
            </h3>
            <div className="space-y-2">
              {displayThreats.map((threat) => {
                const ThreatIcon = getThreatTypeIcon(threat.type)
                return (
                  <div key={threat.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <ThreatIcon className={`h-4 w-4 ${getThreatTypeColor(threat.type)}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{threat.type.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-500">{threat.location}, {threat.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        threat.severity === 'high' ? 'bg-red-100 text-red-800' :
                        threat.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {threat.severity}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{threat.count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {t('threats.threatSummary', 'Threat Summary')}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Threats Detected</span>
                <span className="font-semibold text-gray-900">{displayThreats.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">High Severity</span>
                <span className="font-semibold text-red-600">
                  {displayThreats.filter(t => t.severity === 'high').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Domestic Threats</span>
                <span className="font-semibold text-green-600">
                  {displayThreats.filter(t => t.country === 'Ethiopia').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">International Threats</span>
                <span className="font-semibold text-orange-600">
                  {displayThreats.filter(t => t.country !== 'Ethiopia').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatMap