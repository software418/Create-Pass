/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token if exists (Assuming it's stored in local storage for now)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request metrics timestamp
    (config as any).metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log metrics
    const startTime = (response.config as any).metadata?.startTime;
    if (startTime) {
      const duration = new Date().getTime() - startTime.getTime();
      console.info(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
    }
    return response.data;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.warn('[API] Unauthorized, redirecting to login...');
      // window.location.href = '/login'; 
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
