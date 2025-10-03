import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
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
    logsProcessed: 1247,
    threatsBlocked: 42,
    uptime: '99.9%'
  })
  
  const location = useLocation()

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location])

  // Simulate real-time system updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date(),
        logsProcessed: prev.logsProcessed + Math.floor(Math.random() * 8) + 2,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3)
      }))
    }, 10000) // Update every 10 seconds

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
        {/* Header - Sticky top navigation */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          systemStatus={systemStatus}
        />

        {/* Page Content - Scrollable main area */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard systemStatus={systemStatus} />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/threats" element={<Threats />} />
              <Route path="/network" element={<Network />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Dashboard systemStatus={systemStatus} />} />
              
              {/* 404 Fallback */}
              <Route path="*" element={
                <div className="flex items-center justify-center min-h-96">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </main>

        {/* Footer - System status and copyright */}
        <Footer systemStatus={systemStatus} />
      </div>
    </div>
  )
}

export default Layout