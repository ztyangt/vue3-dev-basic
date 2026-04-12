import type { Router } from 'vue-router'
import { RouterEmitter } from '@/emitter'
import { useConfigStore } from '@/stores/config'
import { useUserStore } from '@/stores/user'
import type { ConfigType } from '@/types/config'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

const setPageTitle = (title: string, to: RouteLocationNormalizedGeneric) => {
  let pageTitle = title || 'Vue3 Dev Basic'

  if (to.meta?.title) {
    if (pageTitle) {
      pageTitle = `${to.meta.title}-${pageTitle}`
    } else {
      pageTitle = to.meta.title as string
    }
  } else {
    pageTitle = pageTitle
  }

  document.title = pageTitle
}

export default async function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore()
    userStore.init()

    //   发布路由跳转事件
    RouterEmitter.emit('ROUTE:CHANGE', to)

    // 设置页面标题
    const store = useConfigStore()
    if (!store.hasConfig) {
      store.getConfig().then(() => {
        setPageTitle(store.config?.title || '', to)
      })
    } else {
      setPageTitle(store.config?.title || '', to)
    }
  })
}
