import type { HttpRequestConfig } from './types'
import type { IHttpRequest } from './interface'
import { FetchRequest } from './fetch'
import { AxiosRequest } from './axios'
import { XhrRequest } from './xhr'

export class HttpRequestFactory {
  /**
   * 创建HTTP请求实例
   * @param config 配置对象
   * @returns 实现了IHttpRequest接口的实例
   */
  public static create(config: HttpRequestConfig): IHttpRequest {
    const { type, baseURL = '', ...restConfig } = config

    switch (type) {
      case 'fetch':
        return this.createFetchRequest(baseURL, restConfig)
      case 'axios':
        return this.createAxiosRequest(baseURL, restConfig)
      case 'xhr':
        return this.createXhrRequest(baseURL, restConfig)
      default:
        throw new Error(`Unsupported HTTP request type: ${type}`)
    }
  }

  private static createFetchRequest(
    baseURL: string,
    config: Omit<HttpRequestConfig, 'type' | 'baseURL'>,
  ): IHttpRequest {
    const instance = new FetchRequest(baseURL)
    // 这里添加Fetch特有的配置
    return instance
  }

  private static createAxiosRequest(
    baseURL: string,
    config: Omit<HttpRequestConfig, 'type' | 'baseURL'>,
  ): IHttpRequest {
    const instance = new AxiosRequest(baseURL, config)
    // 这里添加Axios特有的配置
    return instance
  }

  private static createXhrRequest(
    baseURL: string,
    config: Omit<HttpRequestConfig, 'type' | 'baseURL'>,
  ): IHttpRequest {
    const instance = new XhrRequest(baseURL)
    // 这里添加XHR特有的配置
    return instance
  }
}
