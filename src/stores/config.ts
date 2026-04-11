import type { ConfigType } from '@/types/config'

type Config = {
  title: string
  logo: string
  description: string
  favicon: string
}

export const useConfigStore = defineStore(
  'config-store',
  () => {
    const config = ref<Partial<Config>>({})
    const hasConfig = ref(false)

    // 获取配置
    const getConfig = async () => {
      if (hasConfig.value) return
      config.value = {
        title: 'Vue3 Dev Basic',
        logo: '/static/logo/logo.svg',
        description:
          'Vue3 Dev Basic 是一个基于 Vite8 + Vue3 + TypeScript + ElementPlus 的基础项目，用于快速开发 Vue3 项目。',
        favicon: '/favicon.svg',
      }
      hasConfig.value = true
      // const { code, data } = await configApi.take<ConfigType.Datum<Config>>({
      //   config_key: CONFIG_KEY,
      // })
      // if (code === 200) {
      //   config.value = data.value
      //   hasConfig.value = true
      // }
    }

    // 更新配置
    const updateConfig = async (val: Record<string, any>) => {
      // const { code } = await configApi.update({
      //   config_key: CONFIG_KEY,
      //   value: { ...config.value, ...val },
      // })
      // if (code === 200) {
      //   config.value = { ...config.value, ...val }
      //   hasConfig.value = true
      // }
    }

    const clear = () => {
      config.value = {}
      hasConfig.value = false
    }

    return { getConfig, clear, updateConfig, config, hasConfig }
  },
  {
    persist: [
      // {
      //   key: 'CONFIG-STORE',
      //   pick: ['config', 'system', 'hasConfig'],
      //   storage: sessionStorage
      // }
    ],
  },
)
