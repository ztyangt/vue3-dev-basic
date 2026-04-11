import { useDark } from '@vueuse/core'

export const useTheme = () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
  })

  const toggleTheme = () => {
    const root = document.documentElement
    const dark = root.classList.contains('dark')
    root.classList.add(dark ? 'light' : 'dark')
    root.classList.remove(dark ? 'dark' : 'light')
    setTimeout(() => {
      isDark.value = !isDark.value
    }, 300)
  }

  return { isDark, toggleTheme }
}
