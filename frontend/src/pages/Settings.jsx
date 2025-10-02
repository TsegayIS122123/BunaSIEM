import React from 'react'
import { useTranslation } from 'react-i18next'
import { Settings as SettingsIcon, Shield, Bell, Database } from 'lucide-react'

const Settings = () => {
  const { t } = useTranslation()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure BunaSIEM preferences and system settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Threat Detection</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Real-time Monitoring</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-6 w-6 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Alerts</span>
              <div className="w-12 h-6 bg-green-600 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">SMS Notifications</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-6 w-6 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">System</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Retention</span>
              <span className="text-sm font-medium">30 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto Updates</span>
              <div className="w-12 h-6 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings