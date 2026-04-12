import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { plugins } from './plugins'
import { directives } from './directives'

import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/overlay.scss' // the modal class for message box

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
