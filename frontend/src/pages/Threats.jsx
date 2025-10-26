import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Shield, AlertTriangle, TrendingUp, MapPin, Cpu, Database } from 'lucide-react'

const Threats = () => {
  const { t } = useTranslation()
  const [threatData, setThreatData] = useState(null)

  // Mock data - replace with actual API call to your ML service (port 5000)
  useEffect(() => {
    const mockThreatData = {
      activeThreats: 12,
      threatsBlocked: 847,
      mlConfidence: 94.7,
      predictionAccuracy: 89.2,
      topThreatTypes: [
        { type: 'Brute Force Attacks', count: 45, severity: 'high' },
        { type: 'Data Exfiltration', count: 23, severity: 'critical' },
        { type: 'Phishing Attempts', count: 67, severity: 'medium' },
        { type: 'Malware Activity', count: 34, severity: 'high' }
      ],
      ethiopiaThreats: [
        { region: 'Addis Ababa', threats: 34, trend: 'up' },
        { region: 'Dire Dawa', threats: 12, trend: 'stable' },
        { region: 'Hawassa', threats: 8, trend: 'down' },
        { region: 'Bahir Dar', threats: 15, trend: 'up' }
      ],
      recentThreats: [
        { time: '2 mins ago', type: 'Suspicious Login', severity: 'medium', source: '192.168.1.45' },
        { time: '5 mins ago', type: 'Data Export', severity: 'high', source: '10.0.1.23' },
        { time: '12 mins ago', type: 'Port Scanning', severity: 'critical', source: 'External' }
      ]
    }
    setThreatData(mockThreatData)
  }, [])

  if (!threatData) return <div>Loading threat intelligence...</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Threat Intelligence</h1>
          <p className="text-gray-600">Advanced threat detection and machine learning analysis</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <Cpu className="h-5 w-5" />
          <span className="font-semibold">ML Analysis Active</span>
        </div>
      </div>

      {/* Threat Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Threats</p>
              <p className="text-2xl font-bold text-red-600">{threatData.activeThreats}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">Real-time monitoring</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Threats Blocked</p>
              <p className="text-2xl font-bold text-green-600">{threatData.threatsBlocked}</p>
            </div>
            <Shield className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">This month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ML Confidence</p>
              <p className="text-2xl font-bold text-blue-600">{threatData.mlConfidence}%</p>
            </div>
            <Cpu className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">Threat detection accuracy</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prediction Rate</p>
              <p className="text-2xl font-bold text-purple-600">{threatData.predictionAccuracy}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">Future threat prediction</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ethiopia-Specific Threats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Ethiopia Threat Map</h3>
          </div>
          <div className="space-y-3">
            {threatData.ethiopiaThreats.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{region.region}</div>
                  <div className="text-sm text-gray-600">{region.threats} threats detected</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  region.trend === 'up' ? 'bg-red-100 text-red-800' : 
                  region.trend === 'down' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {region.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Threat Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Recent Threat Activity</h3>
          </div>
          <div className="space-y-3">
            {threatData.recentThreats.map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{threat.type}</div>
                  <div className="text-sm text-gray-600">From: {threat.source}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{threat.time}</div>
                  <div className={`text-xs font-medium ${
                    threat.severity === 'critical' ? 'text-red-600' :
                    threat.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'
                  }`}>
                    {threat.severity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ML-Powered Analysis Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Cpu className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">ML-Powered Threat Detection</h3>
        </div>
        <p className="text-blue-800 mb-4">
          Our machine learning models analyze behavior patterns and network traffic to detect advanced threats specific to Ethiopian infrastructure and usage patterns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded p-3 border border-blue-100">
            <div className="font-medium text-blue-900">Behavioral Analysis</div>
            <div className="text-blue-700">Detects anomalous user behavior</div>
          </div>
          <div className="bg-white rounded p-3 border border-blue-100">
            <div className="font-medium text-blue-900">Pattern Recognition</div>
            <div className="text-blue-700">Identifies attack signatures</div>
          </div>
          <div className="bg-white rounded p-3 border border-blue-100">
            <div className="font-medium text-blue-900">Predictive Analytics</div>
            <div className="text-blue-700">Forecasts emerging threats</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Threats