import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from '../../pages/Dashboard'
import Logs from '../../pages/Logs'
import Alerts from '../../pages/Alerts'
import Threats from '../../pages/Threats'
import Network from '../../pages/Network'
import Settings from '../../pages/Settings'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    lastUpdate: new Date(),
    alerts: 3,
    logsProcessed: 1247
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date(),
        logsProcessed: prev.logsProcessed + Math.floor(Math.random() * 10)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        systemStatus={systemStatus}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          systemStatus={systemStatus}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard systemStatus={systemStatus} />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/network" element={<Network />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Dashboard systemStatus={systemStatus} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${systemStatus.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {systemStatus.online ? 'System Online' : 'System Offline'}
              </span>
              <span>Last update: {systemStatus.lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>BunaSIEM v1.0</span>
              <span>© 2024 Ethiopia Cybersecurity</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout