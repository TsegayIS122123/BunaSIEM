import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/index'
import Layout from './components/layout/Layout'
import Login from './pages/Login'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  )
}

export default App