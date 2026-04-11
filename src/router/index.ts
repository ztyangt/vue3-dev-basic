import createRouteGuard from './guard'
import type { RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const modules = import.meta.glob('./routes/*.ts', { eager: true })

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })

  return result
}

const routes: Readonly<RouteRecordRaw[]> = formatModules(modules, [])

const router = createRouter({
  routes,
  history:
    import.meta.env.APP_ROUTE_MODE === 'history'
      ? createWebHistory(import.meta.env.APP_BASE_URL)
      : createWebHashHistory(import.meta.env.APP_BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
