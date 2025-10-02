import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Bell, User, Settings, LogOut, ChevronDown, Menu, Activity } from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import LanguageToggle from '../common/LanguageToggle'

const Header = ({ onMenuClick, systemStatus }) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const userNavigation = [
    { name: t('header.profile'), href: '#', icon: User },
    { name: t('header.settings'), href: '/settings', icon: Settings },
    { name: t('header.signout'), href: '/login', icon: LogOut },
  ]

  const quickStats = [
    { label: 'Logs/min', value: '247', trend: 'up' },
    { label: 'Threats', value: '12', trend: 'down' },
    { label: 'Uptime', value: '99.9%', trend: 'stable' }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-16 flex items-center justify-between px-6">
        {/* Left Section - Menu Button and Brand */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="h-4 w-4 text-green-500" />
              <span>Addis Ababa, Ethiopia</span>
              <span>•</span>
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section - Stats and User */}
        <div className="flex items-center space-x-6">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-right">
                <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <HeadlessMenu as="div" className="relative">
            <MenuButton className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              {systemStatus.alerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {systemStatus.alerts}
                </span>
              )}
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Security Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <MenuItem>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Multiple failed logins detected</p>
                        <p className="text-sm text-gray-500 mt-1">From IP: 197.156.64.25 - 15 attempts</p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">High</span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Unusual data transfer detected</p>
                        <p className="text-sm text-gray-500 mt-1">2GB download to external IP</p>
                        <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Medium</span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
                  View all notifications
                </button>
              </div>
            </MenuItems>
          </HeadlessMenu>

          {/* Language Toggle */}
          <LanguageToggle />

          {/* User Profile */}
          <HeadlessMenu as="div" className="relative">
            <MenuButton className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Security Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm ${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </HeadlessMenu>
        </div>
      </div>
    </header>
  )
}

export default Header