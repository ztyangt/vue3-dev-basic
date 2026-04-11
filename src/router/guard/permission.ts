import type { Router, RouteRecordNormalized } from 'vue-router'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    next()
  })
}
