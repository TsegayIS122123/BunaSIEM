import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/index'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import ProtectedRoute from './components/common/ProtectedRoute'

// Public Route wrapper
const PublicRoute = ({ children }) => {
  // For demo - in real app, check authentication status
  const isAuthenticated = localStorage.getItem('authToken')
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public route - Login page (no layout) */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            
            {/* Protected routes - All pages with full layout */}
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  )
}

export default App