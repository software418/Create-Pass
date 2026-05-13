// src/services/api.ts
import { createApiClient } from './apiClient'

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  httpMetricsEnabled: import.meta.env.DEV,
  slowThresholdMs: 1000,
})

export default api