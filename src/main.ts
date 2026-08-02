import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { plugins } from './plugins'
import { directives } from './directives'

import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'

// EP 全量基础样式一次性引入（在 overrides 之前）：
//  - 关闭 resolver 按需注入后，所有组件样式集中于此编译，theme-chalk 变量经
//    vite scss.additionalData 注入的 common.scss/dark.scss 覆盖，主题一致；
//  - 覆盖了原先散落在各 chunk 的 message/message-box/overlay 等样式。
import 'element-plus/theme-chalk/src/index.scss'

// Element Plus 选择器覆盖：--cs-* 变量先于覆盖加载，且全程只加载一次。
// 由于 EP 基础样式已在前一次性引入，此处 override 在 CSS 顺序上靠后，可稳定生效。

import '@/styles/element/overrides.scss'
import '@/styles/main.scss'

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
