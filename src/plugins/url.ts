import type { App } from 'vue'
import { useSystemStore } from '@/stores/system'

export function getUrl(url?: string) {
  const systemStore = useSystemStore()
  if (!url) return ''
  if (url.startsWith('http') || !systemStore.system?.domain) return url
  return new URL(url, `${systemStore.system?.domain || ''}`).href
}

export default {
  install(app: App) {
    app.config.globalProperties.$URL = getUrl
  },
}
