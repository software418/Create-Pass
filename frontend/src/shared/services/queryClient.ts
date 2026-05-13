import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

// Uncomment each field (and the matching cache internals below) when enabling caching
export type QueryGetOptions = Record<never, never>;
// & { cache?: boolean }      — opt-in caching (default: false)
// & { dedupe?: boolean }     — dedupe in-flight requests (default: true when cache on)
// & { force?: boolean }      — bypass cache, force fresh request
// & { ttlMs?: number }       — cache TTL in ms (default: 5 min)
// & { tags?: string[] }      — tags for targeted invalidation

// Uncomment fields to enable post-mutation cache invalidation
export type MutationOptions = Record<never, never>;
// & { invalidateTags?: string[] }  — bust specific cache tags on success
// & { invalidateAll?: boolean }    — clear entire cache on success

// interface CacheEntry<T = unknown> {
//   response: AxiosResponse<T>
//   expiresAt: number
//   tags: Set<string>
// }

interface BuildKeyParams {
  method: string;
  url: string;
  params?: unknown;
  headers?: unknown;
}

// ─── Factory ──────────────────────────────────────────────────────────────────

// const DEFAULT_TTL_MS = 5 * 60 * 1_000

/**
 * Creates a query client that wraps an Axios instance (from createApiClient).
 * Inherits all interceptors, tracking, and base URL automatically.
 *
 * @example
 * ```ts
 * // src/services/queryClient.ts
 * import api from './apiClient'
 * import { createQueryClient } from './queryClient'
 *
 * export const { queryGet, queryPost, queryPut, queryPatch, queryDelete } =
 *   createQueryClient(api)
 * ```
 */
export function createQueryClient(axiosInstance: AxiosInstance) {
  // ── Internal state (cache — opt in when needed) ─────────────────────────────
  //   const queryCache      = new Map<string, CacheEntry>()
  //   const inFlightQueries = new Map<string, Promise<AxiosResponse>>()
  //   const tagToKeys       = new Map<string, Set<string>>()

  // ── Key building (used by cache + dedupe) ───────────────────────────────────
  const normalizeValue = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(normalizeValue);
    if (value && typeof value === "object") {
      const sorted: Record<string, unknown> = {};
      Object.keys(value as object)
        .sort()
        .forEach((key) => {
          sorted[key] = normalizeValue((value as Record<string, unknown>)[key]);
        });
      return sorted;
    }
    return value;
  };

  const toStableString = (value: unknown): string =>
    JSON.stringify(normalizeValue(value ?? {}));

  const buildQueryKey = ({
    method = "GET",
    url,
    params,
    headers,
  }: BuildKeyParams): string =>
    [
      method.toUpperCase(),
      url,
      toStableString(params),
      toStableString(headers),
    ].join("::");

  // ── Tag bookkeeping (enable with cache) ─────────────────────────────────────
  //   const linkCacheKeyToTags = (cacheKey: string, tags: string[] = []) => {
  //     tags.forEach((tag) => {
  //       if (!tag) return
  //       if (!tagToKeys.has(tag)) tagToKeys.set(tag, new Set())
  //       tagToKeys.get(tag)!.add(cacheKey)
  //     })
  //   }

  //   const unlinkCacheKeyFromTags = (cacheKey: string, tags: string[]) => {
  //     tags.forEach((tag) => {
  //       const bucket = tagToKeys.get(tag)
  //       if (!bucket) return
  //       bucket.delete(cacheKey)
  //       if (!bucket.size) tagToKeys.delete(tag)
  //     })
  //   }

  //   const clearCacheKey = (cacheKey: string) => {
  //     const entry = queryCache.get(cacheKey)
  //     if (!entry) return
  //     unlinkCacheKeyFromTags(cacheKey, Array.from(entry.tags))
  //     queryCache.delete(cacheKey)
  //   }

  // ── Public cache helpers (uncomment when cache is enabled) ──────────────────

  //   const invalidateQueryCacheByTags = (tags: string[] = []) => {
  //     tags.forEach((tag) => {
  //       const keys = tagToKeys.get(tag)
  //       if (!keys) return
  //       Array.from(keys).forEach(clearCacheKey)
  //       tagToKeys.delete(tag)
  //     })
  //   }

  //   const invalidateAllQueryCache = () => {
  //     queryCache.clear()
  //     inFlightQueries.clear()
  //     tagToKeys.clear()
  //   }

  // ── Invalidation wrapper for mutations (uncomment with cache) ───────────────
  //   const withInvalidation = <T>(
  //     promise: Promise<AxiosResponse<T>>,
  //     options: MutationOptions = {},
  //   ): Promise<AxiosResponse<T>> => {
  //     return promise.then((response) => {
  //       if (options.invalidateAll) invalidateAllQueryCache()
  //       if (options.invalidateTags?.length) invalidateQueryCacheByTags(options.invalidateTags)
  //       return response
  //     })
  //   }

  // ── Query methods ───────────────────────────────────────────────────────────

  /**
   * Performs a GET request. Hits the backend every time.
   *
   * @example
   * ```ts
   * const res = await queryGet<User[]>('/users', { params: { page: 1 } })
   * const users = res.data
   * ```
   *
   * Opt-in caching (uncomment cache internals above first):
   * ```ts
   * const res = await queryGet<User[]>('/users', {}, { cache: true, tags: ['users'], ttlMs: 60_000 })
   * ```
   */
  function queryGet<T = unknown>(
    url: string,
    config: AxiosRequestConfig = {},
    // _options: QueryGetOptions = {},  // uncomment when enabling cache
  ): Promise<AxiosResponse<T>> {
    // Cache opt-in block — uncomment when ready:
    //     const cache  = Boolean(_options.cache)
    //     const force  = Boolean(_options.force)
    //     const dedupe = cache && _options.dedupe !== false
    //     const ttlMs  = Number(_options.ttlMs ?? DEFAULT_TTL_MS)
    //     const tags   = _options.tags ?? []
    //     const queryKey = buildQueryKey({ method: 'GET', url, params: config?.params, headers: config?.headers })
    //     const now = Date.now()
    //     const existing = queryCache.get(queryKey)
    //     if (!force && cache && existing && existing.expiresAt > now) {
    //       return Promise.resolve(existing.response as AxiosResponse<T>)
    //     }
    //     if (dedupe && inFlightQueries.has(queryKey)) {
    //       return inFlightQueries.get(queryKey)! as Promise<AxiosResponse<T>>
    //     }

    void buildQueryKey({
      method: "GET",
      url,
      params: config?.params,
      headers: config?.headers,
    });

    return axiosInstance.get<T>(url, config);
    //       .then((response) => {
    //         if (cache) {
    //           clearCacheKey(queryKey)
    //           queryCache.set(queryKey, { response, expiresAt: Date.now() + Math.max(0, ttlMs), tags: new Set(tags) })
    //           linkCacheKeyToTags(queryKey, tags)
    //         }
    //         return response
    //       })
    //       .finally(() => { inFlightQueries.delete(queryKey) })
  }

  /**
   * Performs a POST request.
   *
   * @example
   * ```ts
   * const res = await queryPost<User>('/users', { name: 'Alice' })
   * ```
   */
  function queryPost<T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    // _options: MutationOptions = {},  // uncomment when enabling cache invalidation
  ): Promise<AxiosResponse<T>> {
    //     return withInvalidation(axiosInstance.post<T>(url, data, config), _options)
    return axiosInstance.post<T>(url, data, config);
  }

  /**
   * Performs a PUT request.
   */
  function queryPut<T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    // _options: MutationOptions = {},  // uncomment when enabling cache invalidation
  ): Promise<AxiosResponse<T>> {
    //     return withInvalidation(axiosInstance.put<T>(url, data, config), _options)
    return axiosInstance.put<T>(url, data, config);
  }

  /**
   * Performs a PATCH request.
   */
  function queryPatch<T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    // _options: MutationOptions = {},  // uncomment when enabling cache invalidation
  ): Promise<AxiosResponse<T>> {
    //     return withInvalidation(axiosInstance.patch<T>(url, data, config), _options)
    return axiosInstance.patch<T>(url, data, config);
  }

  /**
   * Performs a DELETE request.
   */
  function queryDelete<T = unknown>(
    url: string,
    config: AxiosRequestConfig = {},
    // _options: MutationOptions = {},  // uncomment when enabling cache invalidation
  ): Promise<AxiosResponse<T>> {
    //     return withInvalidation(axiosInstance.delete<T>(url, config), _options)
    return axiosInstance.delete<T>(url, config);
  }

  return {
    queryGet,
    queryPost,
    queryPut,
    queryPatch,
    queryDelete,
    //     invalidateQueryCacheByTags,
    //     invalidateAllQueryCache,
  };
}
