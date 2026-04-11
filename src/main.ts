import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { plugins } from './plugins'
import { directives } from './directives'

import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
import { ElCollapseTransition } from 'element-plus'

const app = createApp(App)
app.component(ElCollapseTransition.name!, ElCollapseTransition)

const pinia = createPinia()
pinia.use(createPersistedState())

app.use(pinia)
app.use(router)
app.use(plugins)
app.use(directives)

app.mount('#app')
