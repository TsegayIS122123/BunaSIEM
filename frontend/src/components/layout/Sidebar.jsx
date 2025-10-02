import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Shield,
  Network,
  Settings,
  X,
  Activity
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose, systemStatus }) => {
  const { t } = useTranslation()
  const location = useLocation()

  const navigation = [
    { name: t('sidebar.dashboard'), href: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: t('sidebar.logs'), href: '/logs', icon: FileText, badge: systemStatus.logsProcessed },
    { name: t('sidebar.alerts'), href: '/alerts', icon: AlertTriangle, badge: systemStatus.alerts },
    { name: t('sidebar.threats'), href: '/threats', icon: Shield, badge: null },
    { name: t('sidebar.network'), href: '/network', icon: Network, badge: null },
    { name: t('sidebar.settings'), href: '/settings', icon: Settings, badge: null },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">☕</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">BunaSIEM</h1>
              <p className="text-xs text-gray-500">Security Monitoring</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`
                    px-2 py-1 text-xs rounded-full font-medium
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-gray-200">
          <div className={`p-3 rounded-lg border ${
            systemStatus.online 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Activity className={`h-4 w-4 ${
                systemStatus.online ? 'text-green-600' : 'text-red-600'
              }`} />
              <span className={`text-sm font-medium ${
                systemStatus.online ? 'text-green-800' : 'text-red-800'
              }`}>
                {systemStatus.online ? 'System Operational' : 'System Issues'}
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <p className={systemStatus.online ? 'text-green-600' : 'text-red-600'}>
                Logs processed: {systemStatus.logsProcessed.toLocaleString()}
              </p>
              <p className={systemStatus.online ? 'text-green-600' : 'text-red-600'}>
                Active alerts: {systemStatus.alerts}
              </p>
              <p className="text-gray-500">
                Updated: {systemStatus.lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar