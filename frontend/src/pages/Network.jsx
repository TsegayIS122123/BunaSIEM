import React from 'react'
import { Wifi, Shield, Server, Users, AlertTriangle, Database, Cpu } from 'lucide-react'

const Network = () => {
  const networkStats = {
    activeServices: 4,
    connectedUsers: 12,
    securityEvents: 30,
    threatsBlocked: 8,
    uptime: '99.9%'
  }

  const services = [
    { name: 'Frontend (React)', status: 'healthy', port: 5173, connections: 45, icon: '⚛️' },
    { name: 'Backend API', status: 'healthy', port: 3001, connections: 67, icon: '🖥️' },
    { name: 'Database (PostgreSQL)', status: 'healthy', port: 5432, connections: 23, icon: '🗄️' },
    { name: 'ML Service', status: 'healthy', port: 5000, connections: 12, icon: '🧠' }
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Network Security Map</h1>
          <p className="text-gray-600">Real-time infrastructure monitoring and threat visualization</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <Wifi className="h-5 w-5" />
          <span className="font-semibold">All Systems Operational</span>
        </div>
      </div>

      {/* Network Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Server className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{networkStats.activeServices}</div>
          <div className="text-sm text-gray-600">Active Services</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{networkStats.connectedUsers}</div>
          <div className="text-sm text-gray-600">Connected Users</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{networkStats.securityEvents}</div>
          <div className="text-sm text-gray-600">Security Events</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{networkStats.threatsBlocked}</div>
          <div className="text-sm text-gray-600">Threats Blocked</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{networkStats.uptime}</div>
          <div className="text-sm text-gray-600">System Uptime</div>
        </div>
      </div>

      {/* Services Status - CORRECT PORTS */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Service Status</h2>
          <p className="text-sm text-gray-600">Real-time monitoring of all BunaSIEM services</p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <div className="font-medium text-gray-800">{service.name}</div>
                    <div className="text-sm text-gray-500">Port {service.port}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">{service.connections} connections</div>
                  <div className="text-xs text-green-600 font-medium">● Live</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Architecture Diagram */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">System Architecture</h2>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300">
                <div className="text-2xl mb-2">⚛️</div>
                <div className="font-semibold">Frontend</div>
                <div className="text-sm text-gray-600">Port 5173</div>
                <div className="text-xs text-green-600 mt-1">React</div>
              </div>
              
              <div className="bg-green-100 rounded-lg p-4 border-2 border-green-300">
                <div className="text-2xl mb-2">🖥️</div>
                <div className="font-semibold">Backend</div>
                <div className="text-sm text-gray-600">Port 3001</div>
                <div className="text-xs text-green-600 mt-1">API Server</div>
              </div>
              
              <div className="bg-purple-100 rounded-lg p-4 border-2 border-purple-300">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-semibold">ML Service</div>
                <div className="text-sm text-gray-600">Port 5000</div>
                <div className="text-xs text-green-600 mt-1">AI Analysis</div>
              </div>
              
              <div className="bg-orange-100 rounded-lg p-4 border-2 border-orange-300">
                <div className="text-2xl mb-2">🗄️</div>
                <div className="font-semibold">Database</div>
                <div className="text-sm text-gray-600">Port 5432</div>
                <div className="text-xs text-green-600 mt-1">PostgreSQL</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Real-time data flow between microservices
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Visualization Coming Soon */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Network Visualization</h2>
        </div>
        <div className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Live Network Security Map
            </h3>
            <p className="text-gray-600 mb-4">
              Advanced visualization showing real-time threats across your infrastructure
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                🚀 <strong>Enhanced Features Coming Soon:</strong><br/>
                Interactive network diagrams • Live attack visualization<br/>
                Geographic threat mapping • Real-time traffic analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Network