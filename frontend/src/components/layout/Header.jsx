import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Bell, User, LogOut, Settings, ChevronDown, Menu, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'

const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    // Save preference to localStorage
    localStorage.setItem('bunasiem-language', lng)
  }

  // Load saved language preference on component mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('bunasiem-language')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  return (
    <HeadlessMenu as="div" className="relative">
      <MenuButton className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:block">
          {currentLanguage.flag} {currentLanguage.nativeName}
        </span>
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
        {languages.map((language) => (
          <MenuItem key={language.code}>
            {({ active }) => (
              <button
                onClick={() => changeLanguage(language.code)}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } ${
                  i18n.language === language.code ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span>{language.flag}</span>
                  <span>{language.nativeName}</span>
                </div>
                <span className="text-xs text-gray-500">{language.name}</span>
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </HeadlessMenu>
  )
}

const Header = ({ onMenuClick, systemStatus }) => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Implement search functionality here
      // You can connect this to your search service or filter data
    }
  }

  const getInitials = (name) => {
    return name
      ? name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
      : 'U'
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Left side - Menu button for mobile */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick} 
            className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* System status indicator for mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus?.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-600 font-medium">
              {systemStatus?.online ? t('header.online', 'Online') : t('header.offline', 'Offline')}
            </span>
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('header.searchPlaceholder', 'Search logs, alerts, threats...')} 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ethiopia-gold focus:border-ethiopia-gold transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            {searchQuery && (
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ethiopia-green text-white p-1 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Search className="h-3 w-3" />
              </button>
            )}
          </form>
        </div>

        {/* Right side - Notifications & User profile */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* System status for desktop */}
          <div className="hidden lg:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${systemStatus?.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 font-medium">
              {systemStatus?.online ? t('header.systemOnline', 'System Online') : t('header.systemOffline', 'System Offline')}
            </span>
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
            <span className="text-sm text-gray-500">
              {systemStatus?.logsProcessed?.toLocaleString()} {t('header.logs', 'logs')}
            </span>
          </div>

          {/* Notifications */}
          <button 
            className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
            aria-label={t('header.notifications', 'Notifications')}
          >
            <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium border-2 border-white">
              3
            </span>
          </button>

          {/* User profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200"
              aria-label={t('header.userMenu', 'User menu')}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-ethiopia-green to-green-600 rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                <span className="text-white text-sm font-semibold">
                  {getInitials(user?.name)}
                </span>
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {user?.name || t('header.systemAdmin', 'System Admin')}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || t('header.administrator', 'Administrator')}
                </p>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-gray-600' : ''}`} />
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-80">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                  <div className="flex items-center mt-2">
                    <span className="px-2 py-1 bg-ethiopia-green text-white text-xs rounded-full font-medium capitalize">
                      {user?.role}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      {t('header.verified', 'Verified')}
                    </span>
                  </div>
                </div>
                
                {/* Menu items */}
                <div className="py-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                    <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>{t('header.profile', 'My Profile')}</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
                    <div className="p-1.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>{t('header.settings', 'Account Settings')}</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Logout */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                >
                  <div className="p-1.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span>{t('header.signout', 'Sign Out')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header