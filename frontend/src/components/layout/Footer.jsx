import React from 'react'
import { useTranslation } from 'react-i18next'
import { Shield, Heart } from 'lucide-react'

const Footer = ({ systemStatus }) => {
  const { t } = useTranslation()

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 space-y-3 md:space-y-0">
        {/* Left side - System status */}
        <div className="flex items-center space-x-6 flex-wrap justify-center md:justify-start">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus?.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={systemStatus?.online ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {systemStatus?.online ? '🟢 System Online' : '🔴 System Offline'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Shield className="h-3 w-3 text-blue-500" />
            <span>Last update: {systemStatus?.lastUpdate?.toLocaleTimeString() || 'N/A'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {systemStatus?.logsProcessed?.toLocaleString() || '0'} logs
            </span>
          </div>
        </div>

        {/* Right side - Copyright and version */}
        <div className="flex items-center space-x-4 flex-wrap justify-center md:justify-end">
          <div className="flex items-center space-x-2 text-gray-500">
            <span>BunaSIEM v1.0.0</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Cloud Security Platform</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500">
            <span>© 2025</span>
            <Heart className="h-3 w-3 text-red-500" />
            <span className="text-ethiopia-green font-medium">Ethiopia Cybersecurity</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
          <Shield className="h-3 w-3" />
          <span>🔒 Secured by BunaSIEM • All activities monitored and protected</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer