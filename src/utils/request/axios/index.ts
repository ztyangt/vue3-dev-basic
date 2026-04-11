import axios, { type AxiosInstance, type AxiosProgressEvent, type AxiosRequestConfig } from 'axios'
import type { IHttpRequest } from '../interface'
import type { HttpMethod, RequestOptions, ResponseData } from '../types'
import { reqInterceptors } from './request-interceptors'
import { resInterceptors } from './response-interceptors'
export class AxiosRequest implements IHttpRequest {
  private baseURL: string
  private readonly http: AxiosInstance

  constructor(baseURL: string = '', config: { timeout?: number; withCredentials?: boolean } = {}) {
    this.baseURL = baseURL
    this.http = axios.create({
      baseURL,
      withCredentials: config.withCredentials || false,
      timeout: config.timeout ?? 10000
    })

    reqInterceptors(this.http)
    resInterceptors(this.http)
  }

  public setBaseURL(baseURL: string): void {
    this.baseURL = baseURL
    this.http.defaults.baseURL = baseURL
  }

  public $get<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'GET', data, options)
  }

  public $post<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'POST', data, options)
  }

  public $put<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'PUT', data, options)
  }

  public $delete<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload' | 'handleDownload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'DELETE', data, options)
  }

  public $patch<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'PATCH', data, options)
  }

  public $head<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload' | 'handleDownload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'HEAD', data, options)
  }

  public $upload<T = any>(
    url: string,
    data: FormData,
    options?: Omit<RequestOptions, 'handleDownload'>
  ): Promise<ResponseData<T>> {
    return this.request<T>(url, 'POST', data, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...options?.headers
      }
    })
  }

  private async request<T>(
    url: string,
    method: HttpMethod,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ResponseData<T>> {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: options.headers,
      onUploadProgress: options.handleUpload as (progressEvent: AxiosProgressEvent) => void,
      onDownloadProgress: options.handleDownload as (progressEvent: AxiosProgressEvent) => void
    }

    if (method === 'GET' || method === 'HEAD') {
      config.params = data
    } else {
      config.data = data
    }

    const response = await this.http(config)
    return response.data as ResponseData<T>
  }
}
