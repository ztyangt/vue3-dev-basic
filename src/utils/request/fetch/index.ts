import type { IHttpRequest } from '../interface'
import type { HttpMethod, RequestOptions, ResponseData } from '../types'

export class FetchRequest implements IHttpRequest {
  private baseURL: string
  private timeout: number
  private credentials: RequestCredentials

  constructor(
    baseURL: string = '',
    config: { timeout?: number; credentials?: RequestCredentials } = {},
  ) {
    this.baseURL = baseURL
    this.timeout = config.timeout || 5000
    this.credentials = config.credentials || 'omit'
  }

  public setBaseURL(baseURL: string): void {
    this.baseURL = baseURL
  }

  public $get<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'GET', data, options)
  }

  public $post<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'POST', data, options)
  }

  public $put<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'PUT', data, options)
  }

  public $delete<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload' | 'handleDownload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'DELETE', data, options)
  }

  public $patch<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'PATCH', data, options)
  }

  public $head<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload' | 'handleDownload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'HEAD', data, options)
  }

  public $upload<T = any>(
    url: string,
    data: FormData,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'POST', data, {
      ...options,
      headers: {
        ...options?.headers,
      },
    })
  }

  private async request<T>(
    url: string,
    method: HttpMethod,
    data?: any,
    options: RequestOptions = {},
  ): Promise<ResponseData<T>> {
    const requestUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    })

    let body: BodyInit | null = null
    if (method !== 'GET' && method !== 'HEAD') {
      if (data instanceof FormData) {
        body = data
        headers.delete('Content-Type')
      } else if (data) {
        body = JSON.stringify(data)
      }
    }
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    const config: RequestInit = {
      method,
      headers,
      body,
      credentials: this.credentials,
      signal: controller.signal,
    }

    const request = new Request(requestUrl, config)

    try {
      const response = await fetch(request, config)
      clearTimeout(timeoutId)

      if (options.handleDownload) {
        const reader = response.body?.getReader()
        const contentLength = +(response.headers.get('Content-Length') || 0)
        let receivedLength = 0

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            receivedLength += value?.length || 0
            options.handleDownload({
              loaded: receivedLength,
              total: contentLength,
              lengthComputable: contentLength > 0,
            })
          }
        }
      }

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Request failed')
      }

      return responseData as ResponseData<T>
    } catch (error) {
      clearTimeout(timeoutId)
      console.error('Fetch request error:', error)
      throw error
    }
  }
}
