import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios'

export const reqInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 在发送请求之前做些什么
      // 检查是否需要添加token
      // const userStore = useUserStore()
      // config.headers['Authorization'] = userStore.token
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    },
  )
}
