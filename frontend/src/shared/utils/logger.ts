/* eslint-disable @typescript-eslint/no-explicit-any */
const isDev = Boolean(import.meta.env.DEV)

const formatPrefix = (level: string) => `[${level.toUpperCase()}]`

const write = (level: string, message: string, data: any) => {
  const text = `${formatPrefix(level)} ${message}`

  if (level === 'error') {
    console.error(text, data ?? '')
    return
  }

  if (level === 'warn') {
    console.warn(text, data ?? '')
    return
  }

  if (isDev) {
    console.info(text, data ?? '')
  }
}

export const logger = {
  info: (message: string, data: any) => {
    write('info', message, data)
  },
  warn: (message: string, data?: any) => {
    write('warn', message, data)
  },
  error: (message: string, error: any) => {
    write('error', message, error)
  },
  http: (kind: string, payload: any = {}) => {
    if (!isDev) return

    if (kind === 'request') {
      console.info(`[HTTP][REQ][${payload.requestId}] ${payload.method} ${payload.url}`, payload)
      return
    }

    if (kind === 'response') {
      const level = payload.status >= 500 || payload.durationMs >= payload.slowThresholdMs
        ? 'warn'
        : 'info'

      const prefix = level === 'warn' ? '[HTTP][WARN]' : '[HTTP][RES]'
      const log = level === 'warn' ? console.warn : console.info
      log(`${prefix}[${payload.requestId}] ${payload.method} ${payload.url} -> ${payload.status} in ${payload.durationMs}ms`, payload)
    }
  },
}

