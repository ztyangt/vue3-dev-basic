import type { App } from 'vue'
import urlPlugin from './url'

// 插件列表
export const pluginList = [urlPlugin]

// 安装插件
export function plugins(app: App) {
  pluginList.forEach((plugin) => plugin.install(app))
}
