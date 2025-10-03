import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Logs API
export const logsAPI = {
  getLogs: (params) => api.get('/logs', { params }),
  getLogStats: () => api.get('/logs/stats'),
  simulateLogs: () => api.post('/logs/simulate'),
  ingestLog: (logData) => api.post('/logs', logData),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentAlerts: () => api.get('/dashboard/recent-alerts'),
  getThreatMap: () => api.get('/dashboard/threat-map'),
};

// Alerts API
export const alertsAPI = {
  getAlerts: () => api.get('/alerts'),
  updateAlert: (id, data) => api.put(`/alerts/${id}`, data),
};

export default api;