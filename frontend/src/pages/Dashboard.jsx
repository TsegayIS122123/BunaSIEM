import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Activity, Shield, TrendingUp } from 'lucide-react'
import StatsGrid from '../components/dashboard/StatsGrid'
import RecentAlerts from '../components/dashboard/RecentAlerts'
import ThreatMap from '../components/dashboard/ThreatMap'
import useWebSocket from '../hooks/useWebSocket' 

const Dashboard = ({ systemStatus }) => {
  const { t } = useTranslation()
  const [dashboardData, setDashboardData] = useState({
    securityScore: 92,
    threatLevel: 'low',
    performance: 98.7
  })

  // Simulate real-time dashboard updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        securityScore: Math.max(85, Math.min(98, prev.securityScore + (Math.random() - 0.5))),
        performance: Math.max(95, Math.min(99.9, prev.performance + (Math.random() - 0.3)))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getThreatLevelColor = (level) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100',
      critical: 'text-red-700 bg-red-200'
    }
    return colors[level] || colors.low
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header with Security Score */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('dashboard.welcome', 'Security Overview')}</h1>
            <p className="text-blue-100 text-lg">
              {t('dashboard.subtitle', 'Real-time monitoring and threat detection for Ethiopian organizations')}
            </p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Protected Systems: 8</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Uptime: 99.9%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{dashboardData.securityScore.toFixed(0)}%</div>
            <div className="text-blue-100">{t('dashboard.securityScore', 'Security Score')}</div>
            <div className="flex items-center justify-end space-x-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span className="text-green-300 text-sm">+2.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          {/* Threat Map */}
          <ThreatMap />
          
          {/* System Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Threat Level */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Threat Level</h3>
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getThreatLevelColor(dashboardData.threatLevel)}`}>
                  {dashboardData.threatLevel.toUpperCase()}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{dashboardData.performance.toFixed(1)}%</div>
                  <div className="text-sm text-gray-500">System Performance</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium text-sm">
                  View Logs
                </button>
                <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700 font-medium text-sm">
                  Generate Report
                </button>
                <button className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-yellow-700 font-medium text-sm">
                  Run Scan
                </button>
                <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-purple-700 font-medium text-sm">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <RecentAlerts />
          
          {/* System Health */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              {[
                { service: 'Log Ingestion', status: 'healthy', value: 98 },
                { service: 'Threat Detection', status: 'healthy', value: 96 },
                { service: 'Database', status: 'healthy', value: 99 },
                { service: 'API Services', status: 'warning', value: 87 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{item.service}</div>
                    <div className="text-sm text-gray-500 capitalize">{item.status}</div>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.value >= 90 ? 'bg-green-500' :
                        item.value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard