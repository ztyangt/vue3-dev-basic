import type { Router } from 'vue-router'
import setupDevGuard from './dev'
import setupPageGuard from './page'
import setupLoginGuard from './login'

export default function createRouteGuard(router: Router) {
  // 页面守卫
  setupPageGuard(router)

  // 开发守卫
  setupDevGuard(router)

  // 登录守卫
  // setupLoginGuard(router)
}
