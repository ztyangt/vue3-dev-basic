// types.ts
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'

export interface ProgressEvent {
  loaded: number
  total?: number
  lengthComputable: boolean
}

export interface RequestOptions {
  auth?: boolean
  headers?: Record<string, any>
  handleUpload?: (progressEvent: ProgressEvent) => void
  handleDownload?: (progressEvent: ProgressEvent) => void
}

export interface ResponseData<T = any> {
  code: number
  data: T
  msg: string
  [key: string]: any
}

export type HttpRequestType = 'fetch' | 'axios' | 'xhr'

export type HttpResponseType = 'json' | 'text' | 'blob' | 'arraybuffer'

export interface HttpRequestConfig {
  type: HttpRequestType
  baseURL?: string
  // 其他通用配置项
  timeout?: number
  withCredentials?: boolean
}
