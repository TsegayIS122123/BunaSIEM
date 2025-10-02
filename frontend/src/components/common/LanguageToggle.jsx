import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'

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
    <Menu as="div" className="relative">
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
    </Menu>
  )
}

export default LanguageToggle