import { defineStore } from 'pinia'

type SystemInfo = {
  domain: string
  version: string
  unix: number
}

export const useSystemStore = defineStore(
  'systemStore',
  () => {
    const system = ref<SystemInfo>() // 系统信息

    // 获取系统信息
    const getSystemInfo = async () => {
      // const { code, data } = await systemApi.systemInfo()
      // if (code === 200) {
      //   system.value = data
      // }
      system.value = {
        domain: 'http://127.0.0.1:3000',
        version: '1.0.0',
        unix: Date.now(),
      }
    }

    const clear = () => {
      system.value = undefined
    }

    return {
      clear,
      system,
      getSystemInfo,
    }
  },
  {
    persist: [
      {
        key: 'SYSTEM-STORE-SYSTEM',
        pick: ['system'],
        storage: sessionStorage,
      },
    ],
  },
)
