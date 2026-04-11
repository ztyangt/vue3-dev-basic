import type { Router } from 'vue-router'

export default function setupDevGuard(router: Router) {
  router.beforeEach((to, from) => {
    if (!import.meta.env.DEV) {
      // 生产环境
      if (to.meta.isDev) return { name: '404' }
    }
    return true
  })
}
