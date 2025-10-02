import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const en = {
  translation: {
    // Login page
    login: {
      title: "Sign In to BunaSIEM",
      username: "Username",
      password: "Password", 
      loginButton: "Sign In"
    },
    tagline: "Brewing Cybersecurity for Ethiopia",
    email: "Email",
    password: "Password", 
    sign_in: "Sign In",
    
    // Dashboard
    dashboard: "Dashboard",
    logout: "Logout",
    low: "Low",
    
    // Navigation
    sidebar: {
      dashboard: "Dashboard",
      logs: "Logs",
      alerts: "Alerts",
      threats: "Threat Intelligence",
      network: "Network Map",
      settings: "Settings"
    },
    
    // Header
    header: {
      searchPlaceholder: "Search logs, alerts, threats...",
      profile: "Profile",
      settings: "Settings",
      signout: "Sign Out"
    },

    // New Dashboard Translations
    'dashboard.welcome': 'Security Overview',
    'dashboard.subtitle': 'Real-time monitoring and threat detection for Ethiopian organizations',
    'dashboard.securityScore': 'Security Score',
    'dashboard.totalLogs': 'Total Logs',
    'dashboard.securityEvents': 'Security Events',
    'dashboard.activeAlerts': 'Active Alerts',
    'dashboard.uniqueIPs': 'Unique IPs',
    'dashboard.users': 'Active Users',
    'dashboard.dataProcessed': 'Data Processed',
    'dashboard.last24h': 'Last 24 hours',
    'dashboard.thisWeek': 'This week',
    'dashboard.requiresAttention': 'Requires attention',
    'dashboard.monitored': 'Being monitored',
    'dashboard.onlineNow': 'Online now',
    'dashboard.today': 'Today',

    // Alerts Translations
    'alerts.recentAlerts': 'Recent Security Alerts',
    'alerts.viewAllAlerts': 'View All Security Alerts',
    'alerts.title': 'Security Alerts',

    // Threats Translations
    'threats.liveThreatMap': 'Live Threat Map',
    'threats.activeThreats': 'Active Threats by Type',
    'threats.threatSummary': 'Threat Summary',

    // Logs Translations
    'logs.title': 'Security Logs'
  }
};

// Amharic translations
const am = {
  translation: {
    // Login page
    login: {
      title: "ወደ BunaSIEM ይግቡ",
      username: "የተጠቃሚ ስም",
      password: "የይለፍ ቃል",
      loginButton: "ግባ"
    },
    tagline: "ለኢትዮጵያ የሳይበር ደህንነት ማቀናበር",
    email: "ኢሜይል",
    password: "የይለፍ ቃል",
    sign_in: "ግባ",
    
    // Dashboard
    dashboard: "ዳሽቦርድ",
    logout: "ውጣ",
    low: "ዝቅተኛ",
    
    // Navigation
    sidebar: {
      dashboard: "ዳሽቦርድ",
      logs: "ሎጎች",
      alerts: "ማንቂያዎች",
      threats: "የአደጋ መረጃ",
      network: "የኔትዎርክ ካርታ",
      settings: "ቅንብሮች"
    },
    
    // Header
    header: {
      searchPlaceholder: "ሎጎችን፣ ማንቂያዎችን፣ አደጋዎችን ይፈልጉ...",
      profile: "መገለጫ",
      settings: "ቅንብሮች", 
      signout: "ውጣ"
    },

    // New Dashboard Translations
    'dashboard.welcome': 'የደህንነት አጠቃላይ እይታ',
    'dashboard.subtitle': 'ለኢትዮጵያ ድርጅቶች በቅጽበት መከታተያ እና የአደጋ ማሳወቅ',
    'dashboard.securityScore': 'የደህንነት ነጥብ',
    'dashboard.totalLogs': 'ጠቅላላ ሎጎች',
    'dashboard.securityEvents': 'የደህንነት ክስተቶች',
    'dashboard.activeAlerts': 'ንቁ ማንቂያዎች',
    'dashboard.uniqueIPs': 'አግላለጽ IP አድራሻዎች',
    'dashboard.users': 'ንቁ ተጠቃሚዎች',
    'dashboard.dataProcessed': 'የተከናወነ ዳታ',
    'dashboard.last24h': 'ያለፈው 24 ሰዓት',
    'dashboard.thisWeek': 'ይህ ሳምንት',
    'dashboard.requiresAttention': 'ትኩረት ያስፈልጋል',
    'dashboard.monitored': 'በመከታተያ ላይ',
    'dashboard.onlineNow': 'አሁን በመስመር ላይ',
    'dashboard.today': 'ዛሬ',

    // Alerts Translations
    'alerts.recentAlerts': 'የቅርብ ጊዜ የደህንነት ማንቂያዎች',
    'alerts.viewAllAlerts': 'ሁሉንም የደህንነት ማንቂያዎች ይመልከቱ',
    'alerts.title': 'የደህንነት ማንቂያዎች',

    // Threats Translations
    'threats.liveThreatMap': 'በቀጥታ የአደጋ ካርታ',
    'threats.activeThreats': 'በዓይነት ንቁ አደጋዎች',
    'threats.threatSummary': 'የአደጋ ማጠቃለያ',

    // Logs Translations
    'logs.title': 'የደህንነት ሎጎች'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      am: am
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;