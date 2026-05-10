---
name: 'naming-convention'
description: 'Enforces consistent naming conventions for functions, variables, files and directories. Invoke when creating new files, writing functions, or naming any code entity.'
---

# Naming Convention

This skill defines the naming conventions for the project. All new code MUST follow these rules to maintain consistency.

## File & Directory Naming

### Vue Components

| Category                           | Convention                                           | Example                                                     |
| ---------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| Page views (views/)                | PascalCase directory + `index.vue`                   | `views/main/SampleManagement/index.vue`                     |
| Layout components (layouts/)       | kebab-case directory + `index.vue`                   | `layouts/blank/index.vue`                                   |
| Child components in views          | PascalCase `.vue` file in `components/` subdirectory | `views/main/Overview/components/DataCount.vue`              |
| Shared components (components/)    | PascalCase directory + `index.vue`                   | `components/SvgIcon/index.vue`                              |
| Layout-specific partial components | PascalCase `.vue` directly in layout dir             | `layouts/main/LayoutHeader.vue`, `layouts/main/SideBar.vue` |
| Error pages                        | kebab-number `.vue`                                  | `errors/404.vue`, `errors/403.vue`                          |

### TypeScript Files

| Category            | Convention                        | Example                                      |
| ------------------- | --------------------------------- | -------------------------------------------- |
| Hooks / Composables | `use-<name>/index.ts`             | `hooks/use-theme/index.ts`                   |
| Stores              | camelCase `.ts`                   | `stores/config.ts`, `stores/user.ts`         |
| APIs                | camelCase `.ts`                   | `apis/config.ts`, `apis/user.ts`             |
| Utils (complex)     | kebab-case directory + `index.ts` | `utils/request/axios/index.ts`               |
| Utils (simple)      | camelCase `.ts`                   | `utils/copy/index.ts`                        |
| Directives          | kebab-case directory + `index.ts` | `directives/blur-fade-in/index.ts`           |
| Type definitions    | camelCase `.ts` or `.d.ts`        | `types/rf-signal.ts`, `types/shims-vue.d.ts` |
| Router routes       | kebab-case `.ts`                  | `router/routes/main.ts`                      |
| Router guards       | kebab-case `.ts`                  | `router/guard/permission.ts`                 |
| Styles              | kebab-case `.scss`                | `styles/base.scss`, `styles/animation.scss`  |
| Test files          | camelCase `.test.ts`              | `isChinese.test.ts`                          |

### Static Assets

| Category  | Convention        | Example                                                    |
| --------- | ----------------- | ---------------------------------------------------------- |
| SVG icons | kebab-case `.svg` | `assets/icons/aliyun.svg`, `assets/icons/empty-folder.svg` |

## Function Naming

### Composables (Hooks)

**Pattern**: `use` + PascalCase descriptive name

```
useTheme()          // composable for theme toggling
useEcharts()        // composable for echarts instance
useFileSelect()     // composable for file selection
useEmitter()        // composable for event emitter
```

### Store Definitions

**Pattern**: `use` + PascalCase domain + `Store`

```
useConfigStore()    // store for app configuration
useUserStore()      // store for user state
useLayoutStore()    // store for layout state
useSystemStore()    // store for system state
```

### API Class Instances

**Pattern**: camelCase domain + `Api`

```
configApi           // API for configuration endpoints
userApi             // API for user endpoints
systemApi           // API for system endpoints
```

### Event Emitters

**Pattern**: PascalCase domain + `Emitter`

```
RouterEmitter       // emitter for router events
ApiEmitter          // emitter for API events
UserEmitter         // emitter for user events
```

### Utility / Helper Functions

**Pattern**: camelCase, verb-first or `is` prefix for type guards

```
// Type guards - is + PascalCase
isString()
isNumber()
isEmail()
isChinese()

// Actions - verb + noun (camelCase)
addEventListen()
removeEventListen()
getRippleCount()
incrementRippleCount()
createRippleElement()
createContainer()

// Interceptors - abbreviated noun + full noun
reqInterceptors()
resInterceptors()
```

### Route Names

**Pattern**: PascalCase, matching the view directory name

```
name: 'Overview'
name: 'SampleManagement'
name: 'SignalAnnotation'
name: 'ModelTraining'
name: 'ModelHub'
name: 'SignalClassification'
```

### Route Constants

**Pattern**: UPPER_SNAKE_CASE

```
MAIN_ROUTES
ADMIN_ROUTES
BASE_ROUTES
ERROR_ROUTES
```

### Directive Export Names

**Pattern**: camelCase matching the directory name (kebab converted to camelCase)

```
blur-fade-in/  → export default blurFadeInDirective
draggable/     → export default draggable
ripple/        → export default ripple
resize/        → export default resize
slide-in/      → export default slideIn
```

### Setup / Init Functions

**Pattern**: `setup` + PascalCase noun OR `init` + PascalCase noun

```
setupPageGuard()
setupDevGuard()
setupUserLoginInfoGuard()
setupPermissionGuard()
createRouteGuard()
initStore()
```

### Plugin Registrations

**Pattern**: camelCase plural noun for lists, camelCase noun for single

```
pluginList          // array of plugins
plugins(app)        // registration function
```

## Variable Naming

| Type                       | Convention                                 | Example                                        |
| -------------------------- | ------------------------------------------ | ---------------------------------------------- |
| Local refs / reactives     | camelCase                                  | `formModel`, `loading`, `isDark`               |
| Constants (true constants) | UPPER_SNAKE_CASE                           | `DEFAULT_PLUGIN_OPTIONS`, `SIGNAL_TYPE_COLORS` |
| Boolean variables          | `is`/`has`/`should` + camelCase            | `isDark`, `loading`, `noKeepAlive`             |
| Template refs              | camelCase + `Ref` suffix or just camelCase | `formRef`                                      |
| Props                      | camelCase                                  | `prefix`, `name`, `color`, `size`              |

## CSS Class Naming

**Pattern**: BEM-like with kebab-case

```
.layout-admin
.layout-main
.layout-blank
.bg-pattern-layer
.ambient-blob
.blob-1
.loader
```

## Quick Reference Cheat Sheet

When naming anything in this project, follow this decision tree:

1. **Is it a Vue page/component directory?** → PascalCase (`SampleManagement/`)
2. **Is it a composable function?** → `use` + PascalCase (`useTheme`)
3. **Is it a store?** → `use` + PascalCase + `Store` (`useConfigStore`)
4. **Is it a type guard?** → `is` + PascalCase (`isEmail`)
5. **Is it a boolean variable?** → `is`/`has`/`should` prefix (`isDark`)
6. **Is it a constant?** → UPPER_SNAKE_CASE (`MAIN_ROUTES`)
7. **Is it a utility function?** → camelCase verb-first (`addEventListen`)
8. **Is it a file/directory (non-component)?** → kebab-case (`use-theme/`)
9. **Is it a CSS class?** → kebab-case BEM-like (`bg-pattern-layer`)
10. **Is it a route name?** → PascalCase (`Overview`)
