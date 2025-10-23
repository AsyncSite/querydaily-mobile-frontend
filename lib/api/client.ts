/**
 * API Client for QueryDaily Mobile Frontend
 * 
 * Usage:
 * ```typescript
 * import { apiClient } from '@/lib/api/client';
 * 
 * const response = await apiClient.get('/questions/daily');
 * ```
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8388';
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private useBackend: boolean;

  constructor(baseUrl: string, useBackend: boolean) {
    this.baseUrl = baseUrl;
    this.useBackend = useBackend;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private async request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    if (!this.useBackend) {
      throw new Error('Backend integration is disabled. Set NEXT_PUBLIC_USE_BACKEND=true');
    }

    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(path, params);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  async post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_URL, USE_BACKEND);
export const gatewayClient = new ApiClient(GATEWAY_URL, USE_BACKEND);
