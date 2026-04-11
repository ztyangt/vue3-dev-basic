import type { AxiosInstance } from 'axios'
import { ApiEmitter } from '@/emitter/api'

const successCodeList = [200, 201, 202, 204]

const isSucess = (code: number) => successCodeList.includes(code)

export const resInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      const { code, msg = '未知错误!' } = response.data
      switch (response.data.code) {
        case 400:
          ApiEmitter.emit('API:BAD-REQUEST', msg) // 错误请求
          break
        case 401:
          ApiEmitter.emit('API:LOGIN-EXPIRED') // 登录过期
          break
        case 402:
          ApiEmitter.emit('API:NOT-LOGIN') // 未登录
          break
        case 403:
          ApiEmitter.emit('API:UNAUTHORIZED') // 未授权
        case 404:
          ApiEmitter.emit('API:NOT-FOUND', msg) // 未找到
          break
        case 500:
          ApiEmitter.emit('API:INTERNAL-SERVER-ERROR') // 服务器错误
          break
        case 501:
          ApiEmitter.emit('API:NOT-INSTALL') // 未安装
        default:
          !isSucess(code) && ApiEmitter.emit('API:REQUEST-ERROR', msg) // 请求错误
      }
      return response
    },
    (error) => {
      // 响应错误
      ApiEmitter.emit('API:RESPONSE-ERROR', error.response?.data?.msg || error.message)
      return {
        code: -1,
        msg: error.response?.data?.msg || error.message
      }
    }
  )
}
