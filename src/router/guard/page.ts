import type { Router } from 'vue-router'
import { RouterEmitter } from '@/emitter'
import { useConfigStore } from '@/stores/config'
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
