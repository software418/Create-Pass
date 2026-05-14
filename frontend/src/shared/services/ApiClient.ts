/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

// ─── Configuration ────────────────────────────────────────────────────────────

export interface ApiClientConfig {
  /** Base URL for all requests, e.g. "https://api.example.com" */
  baseURL: string
  /** Request timeout in milliseconds (default: 20 000) */
  timeout?: number
  /** Whether to send cookies with cross-origin requests (default: true) */
  withCredentials?: boolean
  /** Enable HTTP-level metric logging (default: false) */
  httpMetricsEnabled?: boolean
  /** Requests taking longer than this (ms) are counted as "slow" (default: 1 000) */
  slowThresholdMs?: number
}

// ─── Logger (replaceable) ─────────────────────────────────────────────────────

export interface Logger {
  http: (label: string, data:  any) => void
  warn: (message: string, ...args: unknown[]) => void
  error: (message: string, data?:  any) => void
}

const defaultLogger: Logger = {
  http: (label, data) => console.debug(`[HTTP ${label}]`, data),
  warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
  error: (message, data) => console.error(`[ERROR] ${message}`, data),
}

// ─── Internal Types ───────────────────────────────────────────────────────────

interface RequestMetadata {
  requestId: string
  startTimeMs: number
  startedAtISO: string
}

interface EndpointMetric {
  totalRequests: number
  failedRequests: number
  slowRequests: number
  totalDurationMs: number
  maxDurationMs: number
}

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: RequestMetadata
    _retry?: boolean
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createApiClient(
  clientConfig: ApiClientConfig,
  logger: Logger = defaultLogger,
): AxiosInstance {
  const {
    baseURL,
    timeout = 20_000,
    withCredentials = true,
    httpMetricsEnabled = true,
    slowThresholdMs = 1_000,
  } = clientConfig

  const apiClient = axios.create({ baseURL, withCredentials, timeout })

  // ── Metrics ─────────────────────────────────────────────────────────────────
  const endpointMetrics = new Map<string, EndpointMetric>()
  let requestSequence = 0

  const normalizePath = (url = '') => String(url).split('?')[0] || '/'

  const nextRequestId = (): string => {
    requestSequence += 1
    return String(requestSequence).padStart(5, '0')
  }

  const summarizeEndpointMetric = (
    method: string,
    url: string,
    durationMs: number,
    status: number,
  ) => {
    const endpoint = `${String(method || 'GET').toUpperCase()} ${normalizePath(url)}`

    if (!endpointMetrics.has(endpoint)) {
      endpointMetrics.set(endpoint, {
        totalRequests: 0,
        failedRequests: 0,
        slowRequests: 0,
        totalDurationMs: 0,
        maxDurationMs: 0,
      })
    }

    const metric = endpointMetrics.get(endpoint)!
    metric.totalRequests += 1
    metric.totalDurationMs += durationMs
    metric.maxDurationMs = Math.max(metric.maxDurationMs, durationMs)

    if (status >= 400 || status === 0) metric.failedRequests += 1
    if (durationMs >= slowThresholdMs) metric.slowRequests += 1

    return {
      endpoint,
      totalRequests: metric.totalRequests,
      errorRatePct: Number(((metric.failedRequests / metric.totalRequests) * 100).toFixed(1)),
      slowRatePct: Number(((metric.slowRequests / metric.totalRequests) * 100).toFixed(1)),
      avgDurationMs: Number((metric.totalDurationMs / metric.totalRequests).toFixed(1)),
      maxDurationMs: metric.maxDurationMs,
    }
  }

  // UPDATED: Added a dynamic `responseData` argument parameter 
  const trackHttpResponse = (
    config: InternalAxiosRequestConfig | undefined,
    status: number,
    errorMessage = '',
    responseData: unknown = null
  ) => {
    if (!httpMetricsEnabled || !config) return

    const startTime = config.metadata?.startTimeMs ?? performance.now()
    const durationMs = Math.max(0, Math.round(performance.now() - startTime))
    const method = String(config.method || 'GET').toUpperCase()
    const url = config.url || '/'
    const requestId = config.metadata?.requestId ?? 'unknown'
    const endpointStats = summarizeEndpointMetric(method, url, durationMs, status)

    logger.http('response', {
      requestId,
      method,
      url,
      status,
      durationMs,
      slowThresholdMs,
      errorMessage,
      // FIX: Passing the actual parameter down to your defaultLogger configuration mapping
      responseData, 
      endpointStats,
    }as any)
  }

  // ── Request interceptor ─────────────────────────────────────────────────────
  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.metadata = {
      requestId: nextRequestId(),
      startTimeMs: performance.now(),
      startedAtISO: new Date().toISOString(),
    }

    if (httpMetricsEnabled) {
      logger.http('request', {
        requestId: config.metadata.requestId,
        method: String(config.method || 'GET').toUpperCase(),
        url: config.url ?? '/',
        baseURL: config.baseURL ?? baseURL,
        hasBody: Boolean(config.data),
        hasParams: Boolean(config.params),
        startedAtISO: config.metadata.startedAtISO,
      })
    }

    return config
  })

  // ── Response interceptor ────────────────────────────────────────────────────
  apiClient.interceptors.response.use(
    (res: AxiosResponse) => {
      // FIX: Added res.data to pass the payload down the metrics sequence
      trackHttpResponse(res.config, res.status, '', res.data)
      return res
    },
    async (err: unknown) => {
      if (!axios.isAxiosError(err)) return Promise.reject(err)

      const original = err.config
      const status: number = err.response?.status ?? 0
      // FIX: Read error message details or server response payload if validation failed
      const errorData = err.response?.data ?? null

      trackHttpResponse(original, status, err.response?.data?.message ?? err.message, errorData)

      logger.error('API Error', {
        requestId: original?.metadata?.requestId,
        url: err.config?.url,
        status,
        code: err.code,
        message: err.response?.data?.message ?? err.message,
      })

      return Promise.reject(err)
    },
  )

  return apiClient
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getApiError = (err: unknown, fallback = 'Something went wrong'): string => {
  if (!axios.isAxiosError(err)) return fallback
  const data = err.response?.data as Record<string, unknown> | undefined
  const message = data?.message
  const nestedMessage = (data?.error as Record<string, unknown> | undefined)?.message
  return (
    (typeof message === 'string' ? message : undefined) ??
    (typeof nestedMessage === 'string' ? nestedMessage : undefined) ??
    err.message ??
    fallback
  )
}

export type { AxiosInstance, AxiosRequestConfig, AxiosResponse }
