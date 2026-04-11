import type { RouteRecordRaw } from 'vue-router'
import BlankLayout from '@/layouts/blank/index.vue'

const BASE_ROUTES: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: BlankLayout,
    redirect: { name: 'login' },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: { title: '登录' },
      },
    ],
  },
]

export default BASE_ROUTES
