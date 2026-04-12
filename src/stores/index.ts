import { useSystemStore } from './system'

export const initStore = () => {
  const systemStore = useSystemStore()
  systemStore.getSystemInfo()
}
