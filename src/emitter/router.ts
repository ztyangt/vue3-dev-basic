import { Emitter } from '@/utils'

const routeEventNames = ['ROUTE:CHANGE'] as const

// 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理
export const RouterEmitter = new Emitter([...routeEventNames])
