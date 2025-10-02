import React from 'react'
import { useTranslation } from 'react-i18next'
import { Shield, AlertTriangle, TrendingUp } from 'lucide-react'

const Threats = () => {
  const { t } = useTranslation()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Threat Intelligence</h1>
          <p className="text-gray-600">Advanced threat detection and analysis</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <Shield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Threat Intelligence Dashboard</h2>
        <p className="text-gray-600 mb-4">
          Advanced threat detection, machine learning analysis, and predictive security analytics.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-yellow-800">
            <strong>Coming Soon:</strong> ML-powered threat detection and Ethiopia-specific threat intelligence.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Threats