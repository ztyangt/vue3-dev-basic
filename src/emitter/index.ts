import { useUserStore } from '@/stores/user'
import { ApiEmitter } from './api'
import { RouterEmitter } from './router'
import { ElMessage } from 'element-plus'

export * from './api'
export * from './user'
export * from './router'

export const useEmitter = () => {
  // api 响应错误
  ApiEmitter.on('API:RESPONSE-ERROR', (msg: string) => {
    // Message.error(msg === 'Network Error' ? '网络错误!' : msg)
    ElMessage({
      message: msg === 'Network Error' ? '网络错误!' : msg,
      type: 'error',
      plain: true,
    })
  })

  // 登录失效
  ApiEmitter.on('API:LOGIN-EXPIRED', () => {
    ElMessage({
      message: '登录过期,请重新登录!',
      type: 'info',
      plain: true,
    })
    const userStore = useUserStore()
    userStore.logout()
  })

  // api 请求错误
  ApiEmitter.on('API:BAD-REQUEST', (msg: string) => {
    ElMessage({
      message: msg === 'Network Error' ? '网络错误!' : msg,
      type: 'error',
      plain: true,
    })
  })

  // 未安装
  // ApiEmitter.on('API:NOT-INSTALL', (msg: string) => {
  //   userStore.logout()
  //   configStore.clear()
  //   systemStore.clear()
  //   Router.replace({ name: 'install' })
  // })

  // api 未找到
  ApiEmitter.on('API:NOT-FOUND', (msg: string) => {
    ElMessage({
      message: '未找到资源!',
      type: 'error',
      plain: true,
    })
  })

  // api 请求错误
  ApiEmitter.on('API:INTERNAL-SERVER-ERROR', () => {
    ElMessage({
      message: '服务器错误!',
      type: 'error',
      plain: true,
    })
  })

  ApiEmitter.on('API:REQUEST-ERROR', (msg?: string) => {
    ElMessage({
      message: '请求失败!',
      type: 'error',
      plain: true,
    })
  })

  onBeforeUnmount(() => {
    ApiEmitter.clear()
    RouterEmitter.clear()
  })
}
