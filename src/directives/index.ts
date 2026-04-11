import type { App } from 'vue'

const modules = import.meta.glob('./**/*.ts', { eager: true })

export const directives = {
  install: function (app: App<Element>) {
    for (const path in modules) {
      const module = (modules[path] as any).default
      if (!module) continue
      const directiveName = path.split('/')[1]
      const entry = path.split('/')[2]
      if (entry === 'index.ts' && directiveName) {
        app.directive(directiveName, module)
      }
    }
  },
}
