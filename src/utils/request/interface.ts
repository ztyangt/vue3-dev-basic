import type { RequestOptions, ResponseData } from './types'

export interface IHttpRequest {
  /**
   * 设置基础URL
   */
  setBaseURL(baseURL: string): void

  /**
   * GET 请求
   */
  $get<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload'>,
  ): Promise<ResponseData<T>>

  /**
   * POST 请求
   */
  $post<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>>

  /**
   * PUT 请求
   */
  $put<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>>

  /**
   * DELETE 请求
   */
  $delete<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload' | 'handleDownload'>,
  ): Promise<ResponseData<T>>

  /**
   * PATCH 请求
   */
  $patch<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>>

  /**
   * HEAD 请求
   */
  $head<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, 'handleUpload' | 'handleDownload'>,
  ): Promise<ResponseData<T>>

  /**
   * 文件上传
   */
  $upload<T = any>(
    url: string,
    data: FormData,
    options?: Omit<RequestOptions, 'handleDownload'>,
  ): Promise<ResponseData<T>>
}
