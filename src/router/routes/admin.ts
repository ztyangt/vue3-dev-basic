import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/layouts/admin/index.vue'

const ADMIN_ROUTES: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout,
    redirect: { name: 'admin-dashboard' },
    meta: { needLogin: true },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/dashboard/index.vue'),
        meta: { title: '仪表盘' },
      },
    ],
  },
]

export default ADMIN_ROUTES
