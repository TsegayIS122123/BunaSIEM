import React from 'react'
import { useTranslation } from 'react-i18next'
import { Activity, Shield, AlertTriangle, Eye, TrendingUp, Users, Database, CheckCircle, Clock } from 'lucide-react'

const StatsGrid = ({ stats = {} }) => {
  const { t } = useTranslation()

  const statCards = [
    {
      title: t('dashboard.totalLogs', 'Total Logs'),
      value: stats.totalLogs || '1,247',
      icon: Activity,
      color: 'blue',
      change: '+12%',
      description: t('dashboard.last24h', 'Last 24 hours'),
      trend: 'up'
    },
    {
      title: t('dashboard.securityEvents', 'Security Events'),
      value: stats.securityEvents || '89',
      icon: Shield,
      color: 'green',
      change: '-5%',
      description: t('dashboard.thisWeek', 'This week'),
      trend: 'down'
    },
    {
      title: t('dashboard.activeAlerts', 'Active Alerts'),
      value: stats.activeAlerts || '12',
      icon: AlertTriangle,
      color: 'red',
      change: '+8%',
      description: t('dashboard.requiresAttention', 'Requires attention'),
      trend: 'up'
    },
    {
      title: t('dashboard.uniqueIPs', 'Unique IPs'),
      value: stats.uniqueIPs || '247',
      icon: Eye,
      color: 'purple',
      change: '+3%',
      description: t('dashboard.monitored', 'Being monitored'),
      trend: 'up'
    },
    {
      title: t('dashboard.users', 'Active Users'),
      value: stats.activeUsers || '48',
      icon: Users,
      color: 'orange',
      change: '+2%',
      description: t('dashboard.onlineNow', 'Online now'),
      trend: 'up'
    },
    {
      title: t('dashboard.dataProcessed', 'Data Processed'),
      value: stats.dataProcessed || '2.4GB',
      icon: Database,
      color: 'indigo',
      change: '+15%',
      description: t('dashboard.today', 'Today'),
      trend: 'up'
    },
    {
      title: 'Incidents Resolved',
      value: stats.incidentsResolved || '189',
      icon: CheckCircle,
      color: 'teal',
      change: '+18%',
      description: 'This month',
      trend: 'up'
    },
    {
      title: 'Avg Response Time',
      value: stats.avgResponseTime || '2.3s',
      icon: Clock,
      color: 'cyan',
      change: '-0.8s',
      description: 'Improvement',
      trend: 'down'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' }
    }
    return colors[color] || colors.blue
  }

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    return <TrendingUp className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        const colorClasses = getColorClasses(stat.color)
        
        return (
          <div
            key={index}
            className={`bg-white rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 ${colorClasses.border}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium opacity-80 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold mb-2">{stat.value}</p>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(stat.trend)}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                <Icon className={`h-6 w-6 ${colorClasses.text}`} />
              </div>
            </div>
            <p className="text-xs mt-3 opacity-70">{stat.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default StatsGrid