import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export type QueryGetOptions = {
  /** Opt-in to caching (default: false). Set to true to enable. */
  cache?: boolean;
  /** Dedupe in-flight requests (default: true when cache is on) */
  dedupe?: boolean;
  /** Bypass cache, force a fresh request and update the cache */
  force?: boolean;
  /** Cache TTL in milliseconds (default: 5 minutes) */
  ttlMs?: number;
  /** Tags for targeted invalidation (e.g., ['users', 'posts']) */
  tags?: string[];
};

export type MutationOptions = {
  /** Bust specific cache tags on a successful mutation */
  invalidateTags?: string[];
  /** Clear the entire cache on a successful mutation */
  invalidateAll?: boolean;
};

interface CacheEntry<T = unknown> {
  response: AxiosResponse<T>;
  expiresAt: number;
  tags: Set<string>;
}

interface BuildKeyParams {
  method: string;
  url: string;
  params?: unknown;
  headers?: unknown;
}

// ─── Factory ──────────────────────────────────────────────────────────────────

const DEFAULT_TTL_MS = 5 * 60 * 1_000; // 5 Minutes

/**
 * Creates a query client that wraps an Axios instance.
 * Inherits all interceptors, tracking, and base URL automatically.
 */
export function createQueryClient(axiosInstance: AxiosInstance) {
  // ── Internal state ──────────────────────────────────────────────────────────
  const queryCache = new Map<string, CacheEntry>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inFlightQueries = new Map<string, Promise<AxiosResponse<any>>>();
  const tagToKeys = new Map<string, Set<string>>();

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

  // ── Tag bookkeeping ─────────────────────────────────────────────────────────
  const linkCacheKeyToTags = (cacheKey: string, tags: string[] = []) => {
    tags.forEach((tag) => {
      if (!tag) return;
      if (!tagToKeys.has(tag)) tagToKeys.set(tag, new Set());
      tagToKeys.get(tag)!.add(cacheKey);
    });
  };

  const unlinkCacheKeyFromTags = (cacheKey: string, tags: string[]) => {
    tags.forEach((tag) => {
      const bucket = tagToKeys.get(tag);
      if (!bucket) return;
      bucket.delete(cacheKey);
      if (!bucket.size) tagToKeys.delete(tag);
    });
  };

  const clearCacheKey = (cacheKey: string) => {
    const entry = queryCache.get(cacheKey);
    if (!entry) return;
    unlinkCacheKeyFromTags(cacheKey, Array.from(entry.tags));
    queryCache.delete(cacheKey);
  };

  // ── Public cache helpers ────────────────────────────────────────────────────
  const invalidateQueryCacheByTags = (tags: string[] = []) => {
    tags.forEach((tag) => {
      const keys = tagToKeys.get(tag);
      if (!keys) return;
      Array.from(keys).forEach(clearCacheKey);
      tagToKeys.delete(tag);
    });
  };

  const invalidateAllQueryCache = () => {
    queryCache.clear();
    inFlightQueries.clear();
    tagToKeys.clear();
  };

  // ── Invalidation wrapper for mutations ──────────────────────────────────────
  const withInvalidation = <T>(
    promise: Promise<AxiosResponse<T>>,
    options: MutationOptions = {}
  ): Promise<AxiosResponse<T>> => {
    return promise.then((response) => {
      if (options.invalidateAll) invalidateAllQueryCache();
      if (options.invalidateTags?.length) {
        invalidateQueryCacheByTags(options.invalidateTags);
      }
      return response;
    });
  };

  // ── Query methods ───────────────────────────────────────────────────────────

  /**
   * Performs a GET request with caching and deduplication support.
   *
   * @example
   * ```ts
   * // Cached for 1 minute, tagged as "users"
   * const res = await queryGet<User[]>('/users', { params: { status: 'active' } }, { 
   *   cache: true, 
   *   ttlMs: 60_000,
   *   tags: ['users']
   * })
   * ```
   */
  function queryGet<T = unknown>(
    url: string,
    config: AxiosRequestConfig = {},
    options: QueryGetOptions = {}
  ): Promise<AxiosResponse<T>> {
    // Note: Change `options.cache ?? false` to `options.cache ?? true` 
    // if you want caching turned ON by default for every GET request.
    const cache = Boolean(options.cache ?? false); 
    const force = Boolean(options.force ?? false);
    const dedupe = cache && options.dedupe !== false;
    const ttlMs = Number(options.ttlMs ?? DEFAULT_TTL_MS);
    const tags = options.tags ?? [];

    const queryKey = buildQueryKey({
      method: "GET",
      url,
      params: config?.params,
      headers: config?.headers,
    });

    const now = Date.now();
    const existing = queryCache.get(queryKey);

    // 1. Return cached response if valid & not forced
    if (!force && cache && existing && existing.expiresAt > now) {
      return Promise.resolve(existing.response as AxiosResponse<T>);
    }

    // 2. Return in-flight promise if dedupe is enabled (prevents identical concurrent network calls)
    if (dedupe && inFlightQueries.has(queryKey)) {
      return inFlightQueries.get(queryKey)! as Promise<AxiosResponse<T>>;
    }

    // 3. Make the actual network request
    const requestPromise = axiosInstance.get<T>(url, config)
      .then((response) => {
        if (cache) {
          clearCacheKey(queryKey); // clear old data/tags before replacing
          queryCache.set(queryKey, {
            response,
            expiresAt: Date.now() + Math.max(0, ttlMs),
            tags: new Set(tags),
          });
          linkCacheKeyToTags(queryKey, tags);
        }
        return response;
      })
      .finally(() => {
        // Cleanup dedupe state regardless of success/failure
        if (dedupe) inFlightQueries.delete(queryKey);
      });

    // Save promise to inFlight map for deduplication
    if (dedupe) {
      inFlightQueries.set(queryKey, requestPromise);
    }

    return requestPromise;
  }

  /**
   * Performs a POST request.
   *
   * @example
   * ```ts
   * // Triggers targeted invalidation, wiping any cached GET requests using the "users" tag
   * const res = await queryPost<User>('/users', { name: 'Alice' }, {}, { invalidateTags: ['users'] })
   * ```
   */
  function queryPost<T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    options: MutationOptions = {}
  ): Promise<AxiosResponse<T>> {
    return withInvalidation(axiosInstance.post<T>(url, data, config), options);
  }

  /**
   * Performs a PUT request.
   */
  function queryPut<T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    options: MutationOptions = {}
  ): Promise<AxiosResponse<T>> {
    return withInvalidation(axiosInstance.put<T>(url, data, config), options);
  }

  /**
   * Performs a PATCH request.
   */
  function queryPatch<T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    options: MutationOptions = {}
  ): Promise<AxiosResponse<T>> {
    return withInvalidation(axiosInstance.patch<T>(url, data, config), options);
  }

  /**
   * Performs a DELETE request.
   */
  function queryDelete<T = unknown>(
    url: string,
    config: AxiosRequestConfig = {},
    options: MutationOptions = {}
  ): Promise<AxiosResponse<T>> {
    return withInvalidation(axiosInstance.delete<T>(url, config), options);
  }

  return {
    queryGet,
    queryPost,
    queryPut,
    queryPatch,
    queryDelete,
    invalidateQueryCacheByTags,
    invalidateAllQueryCache,
  };
}