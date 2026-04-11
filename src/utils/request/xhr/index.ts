import type { IHttpRequest } from '../interface'
import type {
  HttpMethod,
  RequestOptions,
  ResponseData,
  ProgressEvent,
  HttpResponseType,
} from '../types'

export class XhrRequest implements IHttpRequest {
  private baseURL: string
  private timeout: number
  private withCredentials: boolean
  private responseType: HttpResponseType
  private currentXhr: XMLHttpRequest | null = null

  constructor(
    baseURL: string = '',
    config: {
      timeout?: number
      withCredentials?: boolean
      responseType?: HttpResponseType
    } = {},
  ) {
    this.baseURL = baseURL
    this.timeout = config.timeout || 0 // 0 means no timeout
    this.withCredentials = config.withCredentials || false
    this.responseType = config.responseType || 'json'
  }

  public setBaseURL(baseURL: string): void {
    this.baseURL = baseURL
  }

  public abort(): void {
    if (this.currentXhr) {
      this.currentXhr.abort()
      this.currentXhr = null
    }
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

  private request<T>(
    url: string,
    method: HttpMethod,
    data?: any,
    options: RequestOptions = {},
  ): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      const requestUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`
      const xhr = new XMLHttpRequest()
      this.currentXhr = xhr

      xhr.open(method, requestUrl)

      // 设置配置项
      if (this.timeout > 0) {
        xhr.timeout = this.timeout
      }
      xhr.withCredentials = this.withCredentials

      // 设置响应类型
      if (this.responseType === 'json') {
        xhr.responseType = 'text' // 手动处理JSON解析
      } else {
        xhr.responseType = this.responseType
      }

      // 设置请求头
      xhr.setRequestHeader('Content-Type', 'application/json')
      if (options.headers) {
        for (const key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key])
        }
      }

      // 超时处理
      xhr.ontimeout = () => {
        this.cleanup()
        reject(new Error(`Request timed out after ${this.timeout}ms`))
      }

      // 错误处理
      xhr.onerror = () => {
        this.cleanup()
        reject(new Error('Request failed due to network error'))
      }

      // 上传进度处理
      if (options.handleUpload) {
        xhr.upload.onprogress = (event: ProgressEvent) => {
          options.handleUpload!({
            loaded: event.loaded,
            total: event.total,
            lengthComputable: event.lengthComputable,
          })
        }
      }

      // 下载进度处理
      if (options.handleDownload) {
        xhr.onprogress = (event: ProgressEvent) => {
          options.handleDownload!({
            loaded: event.loaded,
            total: event.total,
            lengthComputable: event.lengthComputable,
          })
        }
      }

      // 响应处理
      xhr.onload = () => {
        this.cleanup()

        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            let responseData: any
            if (this.responseType === 'json') {
              responseData = xhr.responseText ? JSON.parse(xhr.responseText) : null
            } else {
              responseData = xhr.response
            }

            const response: ResponseData<T> = {
              code: xhr.status,
              data: responseData,
              msg: 'Success',
              raw: xhr,
            }
            resolve(response)
          } catch (error) {
            reject(new Error('Failed to parse response'))
          }
        } else {
          let errorMessage = `Request failed with status ${xhr.status}`
          try {
            const errorResponse = JSON.parse(xhr.responseText)
            errorMessage = errorResponse.message || errorMessage
          } catch (e) {
            // 忽略JSON解析错误
          }
          reject(new Error(errorMessage))
        }
      }

      // 处理请求体
      let requestData: any = null
      if (method !== 'GET' && method !== 'HEAD') {
        if (data instanceof FormData) {
          requestData = data
          // 删除手动设置的Content-Type，让浏览器自动设置
          xhr.setRequestHeader('Content-Type', 'multipart/form-data')
        } else if (data) {
          requestData = JSON.stringify(data)
        }
      }

      xhr.send(requestData)
    })
  }

  private cleanup(): void {
    this.currentXhr = null
  }
}
