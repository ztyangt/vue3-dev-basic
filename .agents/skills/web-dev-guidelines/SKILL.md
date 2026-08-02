---
name: web-dev-guidelines
version: 1.2.0
description: Go Seed Web project-specific frontend guidelines. This skill should be used when writing, reviewing, or refactoring code in the go-seed-web project to ensure consistent layout, component, and styling conventions.
---

# Web 开发规范 (Development Guidelines)

这是一份针对 `web` 项目的开发规范 Skill。**🚨 触发条件：每次界面设计、UI 美化、页面布局、组件视觉调整、新增或改写视图/页面时，都必须加载并严格遵守本技能。** 在进行任何前端代码生成、重构、组件编写或修改时，必须严格遵守以下约定，以保持项目风格的高度一致性。

## 1. 技术栈与基础规范

- **核心框架**: Vue 3 (Composition API) + TypeScript + Vite。
- **UI 组件库**: Element Plus (`el-*`)。
- **状态管理**: Pinia (`setup` 语法)。
- **图标库**: `@lucide/vue` (按需引入)。
- **SFC 格式**: 所有 Vue 组件必须使用 `<script setup lang="ts">` 语法，并尽可能使用单文件组件(SFC)。

## 2. 样式规范与 `src/styles/base.scss` 的复用 (🚨 核心重点)

项目中已经通过 `src/styles/base.scss` 定义了非常完善的**原子化 CSS / 实用类 (Utility Classes)**。在编写 HTML/模板 时，**强烈要求优先复用这些基础样式类**，极力避免在 `<style scoped>` 中重复书写常见的布局、间距、字体相关的 CSS。

### 常见的可复用 Utility Classes 包括：

- **布局 (Layout & Flex)**:
  - `flex`, `flex-center` (水平垂直居中), `flex-yc` (垂直居中), `flex-column`, `flex-sb` (space-between)。
  - `jc-start`, `jc-end`, `jc-between`, `ai-center`, `ai-start` 等。
- **尺寸 (Size)**:
  - 宽度/高度百分比: `w-100` (100%), `w-50`, `h-100`。
  - 组合: `wh-100` (宽高均为100%)。
- **间距 (Margin & Padding)**:
  - 格式为 `{前缀}-{大小}`，大小为 5 的倍数 (0~75px)。
  - 例如：`mt-20` (margin-top: 20px), `mb-10`, `ml-15`, `px-10` (padding左右), `py-20`, `p-30` 等。
  - 间距 `gap`: `g-10`, `g-20` 等。
- **排版与字体 (Typography)**:
  - 字体大小: `fs-12` 到 `fs-32`。
  - 字体粗细: `fw-300` 到 `fw-700`。
  - 文本对齐: `text-center`, `text-left`, `text-right`。
  - 单行/多行省略: `h-1x`, `h-2x` ... `h-10x`。
- **其他通用类**:
  - 圆角: `br-4`, `br-8` ... `br-50` (50%)。
  - 交互/层级: `pointer` (cursor: pointer), `relative`, `absolute`, `z-1` 到 `z-999`, `no-select`, `pointer-none`。
  - 溢出与显示: `overhide` (overflow: hidden), `d-block`, `d-inline-block` 等。

**示例（Bad）**:

```vue
<template>
  <div class="my-box">
    <div class="my-text">Hello</div>
  </div>
</template>
<style scoped>
.my-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}
.my-text {
  font-size: 14px;
  cursor: pointer;
}
</style>
```

**示例（Good）**:

```vue
<template>
  <div class="flex-yc mt-20 w-100">
    <div class="fs-14 pointer">Hello</div>
  </div>
</template>
<style scoped>
/* 仅针对特殊的业务样式编写 CSS */
</style>
```

## 2.5 界面设计与美化规范 (🚨 核心重点)

**所有界面设计、UI 美化、页面布局相关的工作，都必须严格执行以下规则：**

- **复用 `base.scss`**: 尽量复用 `src/styles/base.scss` 中已定义的 CSS 原子类（详见 §2），极力避免在 `<style scoped>` 中重复书写布局、间距、字体等样式。
- **优先使用 Element Plus 组件**: 尽量使用 `Element Plus` (`el-*`) 组件来实现功能与视觉，而非手写原生 HTML 控件。包括但不限于 `el-button`、`el-input`、`el-select`、`el-table`、`el-card`、`el-form` 等。
- **滚动区域统一使用 `el-scrollbar`**: 所有需要滚动的区域（列表、表格、面板、侧栏、弹窗内容等）**一律使用 `<el-scrollbar>`**，严禁依赖原生 `overflow: auto/scroll` 或 `::-webkit-scrollbar` 自定义样式。示例：
  ```vue
  <el-scrollbar height="100%" class="h-100">
    <div class="p-20">...</div>
  </el-scrollbar>
  ```
- **全局使用小圆角**: 全局视觉风格统一使用**小圆角**。优先复用 `base.scss` 的 `br-4` (4px)、`br-8` (8px) 等小圆角原子类；卡片、按钮、面板、输入框等容器圆角原则上不超过 `br-8`，避免大圆角造成的“软糯感”，保持后台管理系统的专业克制。
- **大气留白与美观**: 页面设计必须**大气、留白合理、视觉美观**：
  - 充分利用 `base.scss` 的间距原子类（`p-*`、`m-*`、`g-*`，见 §2）构建呼吸感，避免内容贴边、拥挤堆叠。
  - 合理使用 `el-card`、分隔区域与留白构建清晰的视觉层次与信息分区。
  - 注意对齐、节奏与一致性，遵循「少即是多」，宁可多留白也不要塞满屏幕。
  - 善用 CSS 变量（`var(--bg-surface)`、`var(--el-color-primary)` 等）保证暗黑模式兼容。

## 3. 组件开发规范

- **自动导入**: 项目配置了 `unplugin-auto-import` 和 `unplugin-vue-components`。常用的 Vue API (如 `ref`, `reactive`, `computed`, `watch`) 可以直接使用，无需手动 `import`。Element Plus 组件 (`el-button` 等) 也是自动引入的。
- **Props 与 Emits**: 使用 `defineProps<{}>()` 和 `defineEmits<{}>()` 进行类型声明。
- **🚨 父子组件双向绑定优先用 `defineModel`**: 实现父子组件间的数据双向绑定（如筛选条件 `v-model`、对话框可见状态 `v-model:visible`、表单编辑态同步等）时，**必须优先使用 Vue 3.4+ 的 `defineModel()` 宏**，不要再手写 `props + emit('update:xxx')` 的三件套。`defineModel` 會自动声明 model prop 并返回一个可读写的 ref，赋值即触发 `update:` 事件，让父级侧 `v-model` 真正"双向"起来。
  - 基础用法：`const model = defineModel<UserType.Datum>()`（父级 `v-model="user"`）；
  - 命名 model：`const visible = defineModel<boolean>('visible', { required: true })`（父级 `v-model:visible="..."`）；
  - 多个 model 并存：一个组件可同时定义任意个 `defineModel`（如弹窗的 `visible` + `model`，参考 `src/views/admin/user-permissions/users/components/users-filter.vue` 的 filter 双向同步）。
  - 反例（避免）：
    ```ts
    // ❌ 手写三件套
    const props = defineProps<{ modelValue: FilterState }>()
    const emit = defineEmits<{ 'update:modelValue': [v: FilterState] }>()
    watch(
      () => props.modelValue,
      (v) => (state = v),
    )
    watch(state, (v) => emit('update:modelValue', v))
    // ✅ defineModel 一行收工
    const model = defineModel<FilterState>({ required: true })
    ```
  - 唯一例外：单次性事件（搜索/重置/打开回收站等 `defineEmits` 跨层级通知，**无对应 prop 起反向同步**）仍保持 `defineEmits` 风格，不要混用 `defineModel`。
- **样式隔离**: 特殊样式必须使用 `<style lang="scss" scoped>`。对于 CSS 变量，项目依赖了诸如 `var(--bg-surface)`, `var(--el-color-primary)`, `var(--text-heading)` 等主题变量，请优先使用 CSS 变量来保证暗黑模式（Dark Mode）的兼容性。

## 4. 状态管理 (Pinia)

- 所有的 store 定义在 `src/stores` 目录下，采用 Composition API 风格书写。
- 例如：
  ```typescript
  export const useUserStore = defineStore('user', () => {
    const userInfo = ref(...)
    function login() { ... }
    return { userInfo, login }
  })
  ```
- 配合持久化时，使用 `pinia-plugin-persistedstate`。

## 5. 图标使用

- 优先从 `@lucide/vue` 中引入图标组件并作为组件使用。
- 示例：`import { Moon, Sun, LogIn } from '@lucide/vue'`。

## 6. 主题与配置

- 获取和切换主题使用 `import { useTheme } from '@/hooks/use-theme'`。
- 获取全局配置使用 `import { useConfigStore } from '@/stores/config'`。

## 7. 平台与响应式

- **默认仅 PC 端设计**：本项目是桌面端后台管理系统，**除非用户特别说明，所有设计、组件开发与代码生成都只针对 PC 端**，不需要考虑移动端、平板等响应式适配。
- 不要主动添加 `@media` 媒体查询、`@media (max-width: ...)` 断点、`@media (orientation: portrait)` 之类的移动端/平板适配代码。
- 不要主动设计移动端布局、折叠菜单、抽屉式导航、移动端手势等。
- 移动端 / 响应式 / 适配工作**只有在用户明确提出时**（如"增加移动端适配"、"支持手机访问"等）才进行。

## 8. 项目代码结构（按模块分层）

新增/修改功能时，遵循下列**按模块分层的目录约定**——同一业务模块（如 `role` / `user` / `permission` / `setting`）的代码在 4 个层级呈镜像分布：

```
src/
├── apis/<module>.ts            # API 请求类（class XxxApi + export const xxxApi）
├── types/<module>.ts            # TS 类型定义（namespace XxxType + Datum/Params/Enum）
├── stores/<module>.ts           # Pinia store（仅跨页面共享的状态才放这里）
├── hooks/use-<name>/index.ts    # 跨页面复用的组合式函数（如 use-pagination）
├── views/admin/<group>/<page>/
│   ├── index.vue                # 页面编排：列表 + 过滤 + 弹窗
│   └── components/
│       ├── <page>-header.vue     # 卡片头（标题 + 数量标签 + 主操作按钮）
│       ├── <page>-filter.vue     # 过滤条（搜索/状态过滤；defineModel 双向绑定）
│       ├── <page>-table.vue      # 表格（含操作列：编辑/删除/角色 等）
│       └── <model>-form-dialog.vue / <model>-<action>-dialog.vue   # 弹窗集
├── router/routes/admin.ts       # 后台路由（自动被 import.meta.glob 加载）
├── utils/request/               # HTTP 请求工厂（统一注入 Authorization，自动展开$result）
├── emitter/                     # 全局事件 + API 错误统一监听（ElMessage 透出）
├── styles/base.scss             # 原子类（§2）；theme.scss 为 CSS 变量
└── layouts/admin/               # 后台布局（Header/SideBar/Footer）
```

### 命名与分层约定

- **类型**：`src/types/<module>.ts` 内统一用 `export namespace XxxType { ... }`，包含
  - `Datum`（接口返回主对象，`extends CommDatum` 含 `id`/`created_at`/`updated_at`/`deleted_at`）
  - `*Params`（Create / Update / Query / Reset / Set...，批量类统一用 `BatchParams { ids: number[] }`）+ 配套 `BatchFailedItem` / `BatchResult`
  - `RoleRef` / `PermissionRef` 等精简关联引用
  - `Gender` / `Status` 等枚举 + 同名 `GenderLabel` / `StatusLabel` 标签映射
  - 需保留兼容字段不要直接删除（如 `UserInfo` / `UserLoginInfo` / `JwtData` 供 auth/store 使用）。
- **API**：`src/apis/<module>.ts` 写 `class XxxApi { method() {} }` 并 `export const xxxApi = new XxxApi()`。方法签名：`create(params: XxxType.CreateParams)` / `update(params)` / `list(params): Pagination<XxxType.Datum>` / `remove(id: number)` 等。
- **页面级组件**：`src/views/admin/<group>/<page>/index.vue` 只做编排——列请求/分页/弹窗编排，不堆砌表单/对话框实现（详见 §3）；遵循 `el-card` 套 `#header` + `#footer`（pagination）布局。
- **可复用子组件**：同级 `components/` 子目录按职责拆分，**单文件 ≲ 300 行**；拿不准时参考 `src/views/admin/user-permissions/users/` 全套组件。
- **路由**：`src/router/routes/admin.ts` 用 `name: 'admin-<group>-<page>'` 形式注册，`meta.title` / `meta.icon` 必填，`meta.icon` 取 `@lucide/vue` 图标名（如 `Users` / `Shield` / `Key`）。

### 关键基础设施

- **`src/utils/request/`**：自动注入 `Authorization`（来自 cookie），并提供 `$get` / `$post` / `$put` / `$patch` / `$delete`，统一返回 `{ code, data, msg }`。**业务代码不写 try/catch**（错误由 `src/emitter` 全局处理，详见 §接口调用规范）。
- **`src/emitter/`**：自动监听 API 错误并 `ElMessage` 提示，业务侧不再重复弹错。
- **`src/hooks/use-pagination/index.ts`**：返回 `{ pageSize: ref(20), total: ref(0), currentPage: ref(1) }`，列表页直接解构使用。
- **`unplugin/auto-imports.d.ts` / `unplugin/components.d.ts`**：自动导入产物，勿手改；新增 vue/pinia/vue-router API 或 Element Plus 组件会被 `unplugin-auto-import` / `unplugin-vue-components` 自动识别。
- **Vite 代理**：`vite.config.ts` 已配 `/api/v1 -> http://127.0.0.1:8080`，本地开发直连后端，无需跨域配置。

## 9. 接口功能对接联调流程（标准 9 步）

以「用户管理 + 回收站」为例，从接口发现到上线联调的推荐流程：

### Step 1 — 加载本 Skill

开始任何对接/页面工作前，加载 `go-seed-web-guidelines` Skill（本文件），确保按 §2/§2.5/§3 的样式与拆分约定执行。

### Step 2 — 用 `go-seed-swagger` MCP 检索接口

首选工具：`swagger_search`（关键字模糊匹配路径与 schema），快速锁定模块全貌：

```
swagger_search  keyword=user      →  命中 /user* 8 个接口 + user.* 11 个 schema
```

若不确定有哪些端点，用 `swagger_list_paths` / `swagger_list_schemas` 全量罗列。

### Step 3 — 取接口详细定义

对每个接口用 `swagger_get_path` 按 method 取 `parameters` / `requestBody` / `responses`：

```
swagger_get_path  path=/user  method=POST
swagger_get_path  path=/user/list  method=POST
...
```

- 注意 query 形参（如 `DELETE /user?id=1`）与 body 形参（`POST /user`）的差异，前者在前端 API 方法里用 `http.$delete(url, { id })` 传参；
- 响应里 `data` 常是 `response.Result` + 业务 `allOf` 合并结构，直接展开看 `data` 字段；
- 每个请求都带 `Authorization` header，由 `utils/request` 自动注入，前端不用写。

### Step 4 — 取 schema 定义

对 `requestBody`/`responses` 里的 `$ref` schema 逐一调 `swagger_get_schema`，递归展开字段：

```
swagger_get_schema  name=user.CreateUserRequest
swagger_get_schema  name=user.UserResponse
swagger_get_schema  name=comm.UserStatus   # 枚举 1/2
```

枚举要记下：`UserGender 1=男 2=女 3=保密`、`UserStatus 1=正常 2=封禁` 等。

### Step 5 — 后端若有改动，强制刷新缓存

后端新加/改动接口时，每个 MCP 调用传 `refresh=true` 重新拉 doc.json：

```
swagger_list_paths  refresh=true
swagger_get_path    path=/user/restore  method=PATCH  refresh=true
swagger_get_schema  name=user.QueryUsersRequest      refresh=true
```

**「回收站」就靠这步发现**——`/user/restore` 与 `QueryUsersRequest.only_deleted` 是补加的；不刷会漏。

### Step 6 — 用 `codegraph_explore` 探索同类现有模块

对接前先看项目里同形态的成熟模块怎么写，**不要从零设计**：

```
codegraph_explore  query="role view page router http request util RoleApi list page component"
```

一次调用取回 `src/apis/role.ts` / `src/types/role.ts` / `src/views/admin/user-permissions/roles/index.vue` + 各子组件的 verbatim 源码。新模块镜像它的：Api 类风格、namespace 内类名（`Datum` / `CreateParams` / `UpdateParams` / `QueryParams`）、index.vue 编排、组件拆分粒度。

### Step 7 — 落类型 `src/types/<module>.ts`

按 §8 命名约定，**先类型后 API**：

- 主对象 `Datum extends CommDatum`，字段名与后端 snake_case 保持一致（前端约定不重命名）；
- `*Params` 按契约标注 `required` 与 `maxLength`/`minLength`/`enum`；
- 枚举值用 TS `enum`，并附 `GenderLabel`/`StatusLabel` 映射供 `<el-tag>` 用；
- 兼容字段不删（`UserInfo` / `UserLoginInfo` / `JwtData` 留给 auth/store 用）。

### Step 8 — 落 API `src/apis/<module>.ts`

照搬 `src/apis/role.ts` 的骨架：

```ts
import http from '@/utils/request'
import type { Pagination } from '@/types/comm'
import type { UserType } from '@/types/user'

class UserApi {
  create(params: UserType.CreateParams) {
    return http.$post<UserType.Datum>('/user', params)
  }
  update(params: UserType.UpdateParams) {
    return http.$patch<UserType.Datum>('/user', params)
  }
  remove(ids: number[]) {
    return http.$delete<UserType.BatchResult>('/user', { ids })
  }
  list(params: UserType.QueryParams = {}) {
    return http.$post<Pagination<UserType.Datum>>('/user/list', params)
  }
  resetPassword(params: UserType.ResetPasswordParams) {
    return http.$patch('/user/password', params)
  }
  permanentRemove(ids: number[]) {
    return http.$delete<UserType.BatchResult>('/user/permanent', { ids })
  }
  restore(ids: number[]) {
    return http.$patch<UserType.BatchResult>('/user/restore', { ids })
  }
  setRoles(params: UserType.SetRolesParams) {
    return http.$put<UserType.Datum>('/user/roles', params)
  }
}
export const userApi = new UserApi()
```

- 列表用 `POST /list`（即便查询也走 POST），返回 `Pagination<Datum>`；
- query 形参的删除/恢复接 `http.$delete(url, { id })`；
- 不要包 try/catch（错误由全局 emitter 处理），返回 `{ code, data }` 让业务判断 `code === 200`。

### Step 9 — 落页面与组件 `src/views/admin/<group>/<page>/`

按 §3 / §8 拆分，落地顺序：

1. `index.vue`：搭 `el-card wh-100 p-20` + `header` + `filter` + `table` + `footer pagination` 骨架；
2. `components/<page>-header.vue`：标题 + 数量 `el-tag` + 主操作按钮（新建 / 切换视图）；
3. `components/<page>-filter.vue`：搜索框/状态下拉/重置按钮；`defineModel<FilterState>()` 双向绑定，`defineEmits<{ search: []; reset: [] }>()`；
4. `components/<page>-table.vue`：表格列定义 + 操作列；通过 props 区分视图（如 `view: 'all' | 'deleted'`）渲染不同动作；`defineEmits` 显式声明每个动作事件；
5. `components/<model>-form-dialog.vue`：创建/编辑同表单（编辑态禁用账号等关键字段）；保留 `mode`/`model` props + `watch(visible)` 同步副本；
6. 其他动作弹窗（重置密码 / 角色分配 / 权限树）按需新建；
7. `index.vue` 编排：`fetchData` 拉列表、`handleRemove/handleRestore` 等处理函数、各弹窗 visible/submitting 状态，删除类用 `ElMessageBox.confirm(...).then(async ...).catch(() => {})` 吞取消分支；
8. `src/router/routes/admin.ts` 注册路由（`name: 'admin-<group>-<page>'`，`meta.title/icon` 必填）。

### Step 10 — 验证

1. `npm run type-check`：新增/改动文件需 0 报错（既有无关报错可忽略，必要时用 `git stash --include-untracked` 对照基线）；
2. `npx prettier --write src/apis src/types 'src/views/admin/**/*'`：统一格式；
3. `npm run dev` 启动 Vite（`http://localhost:8000`），通过 `/api/v1` 代理连本地后端联调；
4. 走一遍完整业务闭环：列表 → 过滤 → 新建 → 编辑 → 删除（软删） → 回收站 → 恢复 / 彻底删除；
5. 弹窗表单校验、`code !== 200` 静默 return、成功 `ElMessage.success` 提示是否符合 §接口调用规范。

### 回收站类功能的标准实现模式

后端用软删除（`deleted_at` 置位）时，前端复用**同一查询接口**切两个视图：

- `QueryUsersRequest.only_deleted?: boolean`（true=回收站视图，false/nil=正常视图）；
- 常规视图操作：编辑 / 角色 / 密码 / **软删除**（`DELETE /user`，body `{ ids }`）；
- 回收站视图操作：**恢复**（`PATCH /user/restore`）/ **彻底删除**（`DELETE /user/permanent`，二次确认 `type: 'error'`，不可逆）；
- 三个删除/恢复接口均为**批量**：请求体 `{ ids: number[] }`，返回 `UsersBatchResult { succeeded: number[]; failed: BatchFailedItem[] }`。**单条操作也要包成 `[id]`**，前端不做单条变体；
- 失败项 `failed[].msg` 必须提示出来（汇总成一条 `ElMessage.warning`，列出 `<账号>: <原因>`，找不到账号回退 `#<id>`）；
- 表格用 `<el-table-column type="selection">` 多选 + `@selection-change` 上抛选中行；`:selectable="row => !row.is_system"` 屏蔽系统内置用户；
- 批量操作条复用筛选组件位（`hasSelection` 时切换渲染）：常规视图给「批量删除」，回收站给「批量恢复 / 彻底删除」+「取消选择」；
- 单条与批量共用同一 handler 链：批量化时拿 `selectedIds`，单条时包 `[row.id]`；成功后 `tableRef.value.clearSelection()` + `fetchData()`；
- 切换视图 / 翻页 / 重新查询时都要 `clearSelection()`，避免跨视图选中残留；
- 系统内置用户（`is_system === true`）删除按钮 `:disabled` 绑定，防误删。

## 总结

**你的目标是写出“看起来像原本就属于这个项目的代码”。** 在增加新视图或组件时，绝不随意写死内联样式或滥写 scoped CSS，而是大量地组合 `base.scss` 提供的原子类；界面设计与美化时优先使用 Element Plus 组件、滚动统一 `el-scrollbar`、全局小圆角、大气留白美观。保持代码极致的简洁、规范与高复用性。
