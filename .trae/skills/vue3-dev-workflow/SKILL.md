---
name: 'vue3-dev-workflow'
description: 'Enforces development workflow based on project architecture, Element Plus components, and style guidelines. Invoke before any page design or feature development.'
---

# Vue3 Dev Workflow

在对该项目进行页面设计和功能开发之前，**必须**遵循以下开发规范和流程。

## 📋 开发前检查清单

### 1. 项目架构理解

#### 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **语言**: TypeScript
- **路由**: Vue Router
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **UI 组件库**: Element Plus
- **网络请求**: Axios (已封装)
- **工具库**: @vueuse/core
- **图标**: @lucide/vue + 本地 SVG 图标
- **CSS 预处理器**: Sass

#### 目录结构规范

```
src/
├── apis/            # 接口请求 (按模块划分)
├── assets/          # 静态资源 (SVG 图标等)
├── components/      # 公共组件 (全局注册)
├── directives/      # 自定义指令
├── hooks/           # 组合式函数 (Composables)
├── layouts/         # 页面布局 (admin, main, blank)
├── router/          # 路由配置
│   ├── routes/      # 路由定义 (按模块：admin, main, error, login)
│   └── guard/       # 路由守卫
├── stores/          # Pinia 状态管理
├── styles/          # 全局样式与主题
│   ├── element/     # Element Plus 样式覆盖
│   ├── base.scss    # 基础样式 (间距、字体等)
│   ├── main.scss    # 主样式文件
│   └── theme.scss   # 主题变量
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
└── views/           # 页面视图 (按模块划分)
```

### 2. Element Plus 组件使用规范

#### 自动引入

项目已配置 `unplugin-vue-components`，Element Plus 组件**自动引入**，无需手动 import：

```vue
<template>
  <!-- ✅ 正确：直接使用 -->
  <el-button type="primary">按钮</el-button>
  <el-table :data="tableData"></el-table>

  <!-- ❌ 错误：无需手动引入 -->
  <script setup>
    import { ElButton } from 'element-plus'
  </script>
</template>
```

#### 常用组件参考

- **布局**: `el-container`, `el-header`, `el-aside`, `el-main`, `el-footer`
- **表单**: `el-form`, `el-form-item`, `el-input`, `el-select`, `el-date-picker`
- **数据展示**: `el-table`, `el-pagination`, `el-card`, `el-descriptions`
- **反馈**: `el-message`, `el-notification`, `el-dialog`, `el-loading`
- **导航**: `el-menu`, `el-breadcrumb`, `el-tabs`

### 3. 样式开发规范

#### 全局样式类

项目提供了丰富的工具类（定义在 `src/styles/base.scss`）：

**间距类** (5px 倍数，0-75px):

```vue
<template>
  <div class="p-10">padding: 10px</div>
  <div class="m-20">margin: 20px</div>
  <div class="pl-15">padding-left: 15px</div>
  <div class="my-10">margin-top/bottom: 10px</div>
</template>
```

**响应式间距**: 平板和移动端会自动缩放

**字体大小** (12px-32px):

```vue
<div class="fs-14">14px</div>
<div class="fs-16">16px</div>
```

**字体粗细**:

```vue
<div class="fw-400">normal</div>
<div class="fw-600">semibold</div>
<div class="fw-700">bold</div>
```

**圆角** (1px-10px):

```vue
<div class="br-2">border-radius: 2px</div>
<div class="br-4">border-radius: 4px</div>
```

**文本省略**:

```vue
<div class="h-1x">单行省略</div>
<div class="h-2x">双行省略</div>
<div class="h-3x">三行省略</div>
```

**Flex 布局**:

```vue
<div class="flex-1">flex: 1</div>
<div class="flex-center">justify-center + align-center</div>
```

**其他工具类**:

```vue
<div class="opa-50">opacity: 0.5</div>
<div class="relative">position: relative</div>
<div class="absolute">position: absolute</div>
```

#### 主题变量

使用 CSS 变量支持暗黑模式：

```scss
// 背景色
var(--color-bg)
var(--color-bg-secondary)
var(--color-bg-page)

// 文字颜色
var(--color-text-main)
var(--color-text-regular)
var(--color-text-secondary)
var(--color-text-placeholder)

// 边框颜色
var(--color-border)
var(--color-border-light)

// 阴影
var(--box-shadow)
var(--box-shadow-light)
```

#### 布局组件样式

使用 `main-bg-style` 类作为页面背景：

```vue
<template>
  <div class="main-bg-style">
    <!-- 页面内容 -->
  </div>
</template>
```

### 4. 开发流程

#### 4.1 创建新页面

1. **在 `src/views/` 下创建模块目录**

   ```
   src/views/
   └── your-module/
       └── index.vue
   ```

2. **添加路由配置**
   - 管理台页面：`src/router/routes/admin.ts`
   - 主流程页面：`src/router/routes/main.ts`
   - 登录页面：`src/router/routes/login.ts`
   - 错误页面：`src/router/routes/error.ts`

3. **选择布局**
   - `admin`: 管理台布局（侧边栏 + 顶部导航）
   - `main`: 主流程布局
   - `blank`: 空白布局

4. **使用 KeepAlive** (可选)
   ```vue
   <script setup lang="ts">
   defineOptions({
     name: 'YourPageName',
   })
   </script>
   ```

#### 4.2 创建组件

**公共组件** (全局使用):

```
src/components/
└── YourComponent/
    └── index.vue
```

在 `src/components/index.ts` 中注册：

```ts
import YourComponent from './YourComponent/index.vue'
export default function (app: App) {
  app.component('YourComponent', YourComponent)
}
```

**页面级组件** (仅当前页面使用):

```
src/views/your-module/
├── index.vue
└── components/
    └── YourComponent.vue
```

#### 4.3 状态管理

创建 Store (`src/stores/your-store.ts`):

```ts
import { defineStore } from 'pinia'

export const useYourStore = defineStore('your-store', {
  state: () => ({
    // 状态
  }),
  actions: {
    // 方法
  },
  persist: {
    // 持久化配置 (可选)
  },
})
```

#### 4.4 API 请求

创建 API 文件 (`src/apis/your-module.ts`):

```ts
import request from '@/utils/request'

export function getData(params: any) {
  return request({
    url: '/api/data',
    method: 'get',
    params,
  })
}
```

#### 4.5 使用 Hooks

创建可复用逻辑 (`src/hooks/use-your-hook/index.ts`):

```ts
export function useYourHook() {
  // 组合式逻辑
}
```

### 5. 图标使用

#### Lucide 图标

```vue
<script setup lang="ts">
import { Home, User, Settings } from '@lucide/vue'
</script>

<template>
  <Home :size="24" :stroke-width="2" />
</template>
```

#### SVG 图标

将 SVG 文件放入 `src/assets/icons/`，使用 `SvgIcon` 组件：

```vue
<template>
  <SvgIcon name="your-icon" :size="24" color="red" />
</template>
```

### 6. 自定义指令

内置指令：

- `v-ripple`: 波纹效果
- `v-draggable`: 拖拽
- `v-resize`: 监听尺寸变化
- `v-slide-in`: 滑入动画
- `v-blur-fade-in`: 模糊淡入

```vue
<template>
  <button v-ripple>波纹按钮</button>
  <div v-draggable>可拖拽元素</div>
</template>
```

### 7. TypeScript 类型定义

在 `src/types/` 下定义类型：

```ts
// src/types/your-module.ts
export interface YourData {
  id: number
  name: string
}
```

### 8. 代码规范

#### 组件命名

- 使用 PascalCase
- `defineOptions` 中指定 `name`

```ts
<script setup lang="ts">
defineOptions({
  name: 'YourComponentName',
})
</script>
```

#### Props 定义

使用 `defineProps` with type:

```ts
const props = defineProps<{
  title: string
  count?: number
}>()
```

#### Emits 定义

```ts
const emit = defineEmits<{
  submit: [data: any]
  close: []
}>()
```

### 9. 开发工具

#### 代码审查

集成 `code-inspector-plugin`，按住 `Alt` (Windows) / `Option` (Mac) 点击页面元素可直接跳转到编辑器代码位置。

#### 主题切换

使用 `useTheme` hook:

```ts
import { useTheme } from '@/hooks/use-theme'

const { isDark, toggleTheme } = useTheme()
```

### 10. 禁止事项

❌ **不要**:

- 手动引入 Element Plus 组件（已自动引入）
- 直接修改 `node_modules` 中的样式
- 在组件中重复定义全局样式类
- 使用内联样式（除非动态值）
- 忽略 TypeScript 类型检查

✅ **应该**:

- 使用提供的工具类
- 遵循现有代码风格
- 在 `styles/` 目录下管理样式
- 使用 TypeScript 类型定义
- 按模块组织代码

## 📝 开发检查清单

在开始开发前，确认：

- [ ] 理解项目目录结构
- [ ] 了解 Element Plus 自动引入机制
- [ ] 熟悉全局样式工具类
- [ ] 了解主题变量系统
- [ ] 确定使用的布局类型
- [ ] 规划是否需要 Store、API、Hooks
- [ ] 准备使用的图标资源
- [ ] 了解自定义指令

## 🔗 相关文件

- 入口文件：[src/main.ts](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/src/main.ts)
- Vite 配置：[vite.config.ts](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/vite.config.ts)
- Element Plus 样式：[src/styles/element/common.scss](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/src/styles/element/common.scss)
- 全局样式：[src/styles/main.scss](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/src/styles/main.scss)
- 基础样式：[src/styles/base.scss](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/src/styles/base.scss)
- 主题 Hook: [src/hooks/use-theme/index.ts](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/src/hooks/use-theme/index.ts)
- 路由配置：[src/router/index.ts](file:///Users/ztyangt/code/ztyang/vue3-dev-basic/src/router/index.ts)
