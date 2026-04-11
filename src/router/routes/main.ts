import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/main/index.vue'

const MAIN_ROUTES: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Main',
    component: MainLayout,
    redirect: { name: 'home' },
    meta: { needLogin: false },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/main/home/index.vue'),
        meta: { title: '首页' },
      },
    ],
  },
]

export default MAIN_ROUTES
