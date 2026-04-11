# Vue3 Dev Basic

一个基于 Vue 3 + Vite + TypeScript 的现代化前端开发基础模板，内置了常用的开发依赖和最佳实践，开箱即用。

## 🛠 技术栈

- **框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **路由**: [Vue Router](https://router.vuejs.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- **UI 组件库**: [Element Plus](https://element-plus.org/)
- **网络请求**: [Axios](https://axios-http.com/) (已封装)
- **工具库**: [@vueuse/core](https://vueuse.org/)
- **图标**: [@lucide/vue](https://lucide.dev/) & 本地 SVG 图标支持
- **CSS 预处理器**: [Sass](https://sass-lang.com/)
- **单元测试**: [Vitest](https://vitest.dev/)

## ✨ 特性

- ⚡️ **极速启动**: 基于 Vite 构建，提供极速的冷启动和热更新 (HMR)。
- 📦 **自动引入**: 配置了 `unplugin-auto-import` 和 `unplugin-vue-components`，自动按需引入 Vue API、组件和 Element Plus。
- 🎨 **样式与主题**: 集成 Element Plus，支持暗黑模式，内置基础样式和 SCSS 变量。
- 🗂 **目录结构**: 清晰合理的目录划分，包含 `apis`, `components`, `hooks`, `layouts`, `router`, `stores`, `utils`, `views` 等。
- 🔌 **网络请求封装**: 完善的 Axios 封装，包含请求/响应拦截器、错误处理等。
- 🛠 **自定义指令**: 内置了多个实用指令，如 `v-ripple` (波纹效果), `v-draggable` (拖拽), `v-resize` (监听尺寸变化) 等。
- 🔍 **代码审查**: 集成 `code-inspector-plugin`，支持在页面上点击元素直接跳转到编辑器对应的代码位置。
- 🖼 **SVG 图标**: 集成 `vite-plugin-svg-icons`，支持本地 SVG 图标的便捷使用。

## 📂 目录结构

```text
src/
├── __tests__/       # 单元测试
├── apis/            # 接口请求
├── assets/          # 静态资源 (如 SVG 图标)
├── components/      # 公共组件
├── directives/      # 自定义指令
├── emitter/         # 事件总线
├── hooks/           # 组合式函数 (Composables)
├── layouts/         # 页面布局 (admin, main, blank)
├── plugins/         # Vue 插件
├── router/          # 路由配置与守卫
├── stores/          # Pinia 状态管理
├── styles/          # 全局样式与主题
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
├── views/           # 页面视图
├── App.vue          # 根组件
└── main.ts          # 项目入口文件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 运行单元测试

```bash
npm run test:unit
```

### 代码格式化

```bash
npm run format
```

## 📜 脚本说明

- `dev`: 启动本地开发服务器
- `build`: 执行类型检查并打包生产环境代码
- `preview`: 预览生产环境打包结果
- `test:unit`: 运行 Vitest 单元测试
- `type-check`: 运行 TypeScript 类型检查
- `format`: 使用 Prettier 格式化代码
