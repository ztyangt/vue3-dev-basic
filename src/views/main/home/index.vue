<template>
  <div class="home-page relative z-1 p-30">
    <div class="home-container">
      <el-button circle class="theme-btn" @click="toggleTheme">
        <template #icon>
          <Moon v-if="!isDark" :size="16" />
          <Sun v-else :size="16" />
        </template>
      </el-button>

      <!-- ============ Hero ============ -->
      <section class="hero-card relative overhide br-8 p-40 animate-up">
        <div class="hero-glow glow-1"></div>
        <div class="hero-glow glow-2"></div>

        <div class="relative flex-column">
          <div class="flex-yc g-15">
            <div class="logo-box flex-center">
              <img :src="config.logo" alt="logo" />
            </div>
            <div class="fs-26 fw-700 title-color">{{ config.title }}</div>
          </div>

          <p class="mt-20 fs-15 secondary-color hero-desc">{{ config.description }}</p>

          <div class="flex g-15 mt-30">
            <el-button type="primary" size="large" @click="goAdmin">
              <template #icon>
                <ArrowRight :size="18" />
              </template>
              进入控制台
            </el-button>
            <el-button size="large" plain @click="scrollTo('features')">
              <template #icon>
                <Sparkles :size="18" />
              </template>
              核心特性
            </el-button>
            <el-button size="large" text @click="scrollTo('getting-started')">
              <template #icon>
                <Rocket :size="18" />
              </template>
              快速开始
            </el-button>
          </div>

          <div class="flex hero-stats mt-45">
            <div class="stat-item" v-for="s in stats" :key="s.label">
              <div class="fs-24 fw-700 title-color">{{ s.value }}</div>
              <div class="fs-12 muted-color mt-4">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 核心特性 ============ -->
      <section id="features" class="mt-30 animate-up delay-100">
        <div class="section-head mb-20">
          <div class="fs-20 fw-700 title-color">核心特性</div>
          <div class="fs-13 muted-color mt-5">开箱即用，专注业务开发</div>
        </div>

        <el-row :gutter="20">
          <el-col :span="8" v-for="f in features" :key="f.title" class="mb-20">
            <el-card shadow="hover" class="feature-card">
              <div class="feature-icon" :class="f.cls">
                <component :is="f.icon" :size="22" :stroke-width="1.8" />
              </div>
              <div class="mt-15 fs-16 fw-600 title-color">{{ f.title }}</div>
              <div class="mt-8 fs-13 secondary-color feature-desc">{{ f.desc }}</div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <!-- ============ 技术栈 ============ -->
      <section class="mt-30 animate-up delay-200">
        <div class="section-head mb-20">
          <div class="fs-20 fw-700 title-color">技术栈</div>
          <div class="fs-13 muted-color mt-5">现代主流技术，稳健可靠</div>
        </div>

        <el-card shadow="never" class="stack-card br-8">
          <div class="flex fw-wrap g-15">
            <div v-for="t in stack" :key="t.name" class="stack-item flex-yc g-10 p-15 br-8">
              <div class="stack-icon flex-center">
                <component :is="t.icon" :size="18" />
              </div>
              <div class="flex-column">
                <div class="flex-yc g-8">
                  <span class="fs-14 fw-600 title-color">{{ t.name }}</span>
                  <el-tag v-if="t.version" size="small" type="info">{{ t.version }}</el-tag>
                </div>
                <div class="fs-12 muted-color mt-4">{{ t.desc }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </section>

      <!-- ============ 快速开始 ============ -->
      <section id="getting-started" class="mt-30 animate-up delay-300">
        <div class="section-head mb-20">
          <div class="fs-20 fw-700 title-color">快速开始</div>
          <div class="fs-13 muted-color mt-5">三步启动你的项目</div>
        </div>

        <el-card shadow="never" class="start-card br-8">
          <el-row :gutter="24">
            <el-col :span="10">
              <el-steps direction="vertical" :active="steps.length" finish-status="success">
                <el-step v-for="s in steps" :key="s.title" :title="s.title" :description="s.desc" />
              </el-steps>
            </el-col>
            <el-col :span="14">
              <div class="cmd-card">
                <div class="cmd-header flex-yc g-8">
                  <span class="cmd-dot dot-red"></span>
                  <span class="cmd-dot dot-yellow"></span>
                  <span class="cmd-dot dot-green"></span>
                  <span class="cmd-title muted-color">Terminal</span>
                </div>
                <div class="cmd-body">
                  <div class="cmd-line flex-yc jc-between" v-for="s in steps" :key="s.cmd">
                    <code class="cmd-text">{{ s.cmd }}</code>
                    <el-button text size="small" @click="copyCmd(s.cmd)">
                      <template #icon>
                        <Copy :size="14" />
                      </template>
                      复制
                    </el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </section>

      <!-- ============ Footer ============ -->
      <footer class="flex-yc jc-between mt-30 pb-5">
        <div class="fs-13 muted-color">© 2026 {{ config.title }}. All rights reserved.</div>
        <div class="fs-13 muted-color">Powered by Vue 3 + Vite + TypeScript</div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Sparkles,
  Copy,
  Moon,
  Sun,
  Rocket,
  ShieldCheck,
  Palette,
  Layers,
  Boxes,
  Code2,
  Zap,
  Braces,
  LayoutGrid,
  GitBranch,
  Globe,
} from '@lucide/vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useConfigStore } from '@/stores/config'
import { useTheme } from '@/hooks/use-theme'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()

const configStore = useConfigStore()
const { config } = storeToRefs(configStore)
configStore.getConfig()

const stats = [
  { value: 'Vue 3.5', label: '核心框架' },
  { value: 'Vite 8', label: '构建工具' },
  { value: '16 套', label: '主题色系' },
  { value: '暗黑', label: '模式支持' },
]

const features = [
  {
    icon: Rocket,
    cls: 'icon-primary',
    title: '开箱即用',
    desc: 'Vite + Vue 3 + TypeScript + Element Plus 一体化脚手架，内置路由、状态、请求与主题基建，专注业务开发。',
  },
  {
    icon: ShieldCheck,
    cls: 'icon-success',
    title: '权限体系',
    desc: '路由级与按钮级权限协作鉴权，登录态自动注入，API 错误全局拦截并统一提示。',
  },
  {
    icon: Palette,
    cls: 'icon-warning',
    title: '主题系统',
    desc: '内置多套主题色与暗黑模式，基于 CSS 变量一键切换，风格统一可控。',
  },
  {
    icon: Layers,
    cls: 'icon-info',
    title: '原子化样式',
    desc: '完善的基础样式类体系，告别重复的 scoped CSS，代码极致简洁、易于维护。',
  },
  {
    icon: Boxes,
    cls: 'icon-danger',
    title: '状态管理',
    desc: 'Pinia Composition API 风格，配合持久化插件，跨页面状态共享零负担。',
  },
  {
    icon: Code2,
    cls: 'icon-cyan',
    title: '类型安全',
    desc: 'TypeScript 全链路类型推导，模块化 namespace 类型定义，接口对接更可靠。',
  },
]

const stack = [
  { icon: Code2, name: 'Vue 3', version: '3.5', desc: 'Composition API' },
  { icon: Zap, name: 'Vite', version: '8', desc: '构建工具' },
  { icon: Braces, name: 'TypeScript', version: '6.0', desc: '类型安全' },
  { icon: LayoutGrid, name: 'Element Plus', version: '2.13', desc: 'UI 组件库' },
  { icon: Boxes, name: 'Pinia', version: '3', desc: '状态管理' },
  { icon: GitBranch, name: 'Vue Router', version: '5', desc: '路由管理' },
  { icon: Palette, name: 'Sass', desc: '样式预处理' },
  { icon: Globe, name: 'Axios', desc: 'HTTP 请求' },
]

const steps = [
  { title: '安装依赖', desc: '安装项目所需依赖', cmd: 'npm install' },
  { title: '本地开发', desc: '启动开发服务', cmd: 'npm run dev' },
  { title: '生产构建', desc: '类型检查并打包', cmd: 'npm run build' },
]

const goAdmin = () => {
  router.push('/admin')
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const copyCmd = (cmd: string) => {
  navigator.clipboard?.writeText(cmd)
  ElMessage.success({ message: '命令已复制', plain: true })
}
</script>

<style lang="scss" scoped>
.home-container {
  max-width: 1120px;
  margin: 0 auto;
}

.theme-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
}

/* ---------- Hero ---------- */
.hero-card {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--el-color-primary) 8%, var(--bg-surface)),
    var(--bg-surface) 55%
  );
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;

  &.glow-1 {
    top: -60px;
    right: 10%;
    width: 260px;
    height: 260px;
    background: var(--el-color-primary);
    opacity: 0.12;
  }

  &.glow-2 {
    bottom: -80px;
    left: 20%;
    width: 300px;
    height: 300px;
    background: var(--el-color-success);
    opacity: 0.1;
  }
}

.hero-desc {
  max-width: 640px;
  line-height: 1.8;
}

.logo-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-info));
  box-shadow: 0 8px 20px -4px color-mix(in srgb, var(--el-color-primary) 40%, transparent);

  img {
    width: 32px;
    height: 32px;
  }
}

.hero-stats {
  gap: 64px;
}

/* ---------- 通用 section 头 ---------- */
.section-head {
  position: relative;
  padding-left: 14px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 4px;
    width: 4px;
    border-radius: 2px;
    background: linear-gradient(180deg, var(--el-color-primary), var(--el-color-primary-light-5));
  }
}

/* ---------- 核心特性 ---------- */
.feature-card {
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-3px);
  }
}

.feature-desc {
  line-height: 1.8;
}

.feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-primary {
  color: var(--el-color-primary);
  background: color-mix(in srgb, var(--el-color-primary) 12%, transparent);
}

.icon-success {
  color: var(--el-color-success);
  background: color-mix(in srgb, var(--el-color-success) 12%, transparent);
}

.icon-warning {
  color: var(--el-color-warning);
  background: color-mix(in srgb, var(--el-color-warning) 12%, transparent);
}

.icon-info {
  color: var(--el-color-info);
  background: color-mix(in srgb, var(--el-color-info) 12%, transparent);
}

.icon-danger {
  color: var(--el-color-danger);
  background: color-mix(in srgb, var(--el-color-danger) 12%, transparent);
}

.icon-cyan {
  color: #06b6d4;
  background: color-mix(in srgb, #06b6d4 12%, transparent);
}

/* ---------- 技术栈 ---------- */
.stack-item {
  border: 1px solid var(--border-light);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--border-hover);
  }
}

.stack-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  color: var(--el-color-primary);
  background: color-mix(in srgb, var(--el-color-primary) 10%, transparent);
  flex-shrink: 0;
}

/* ---------- 快速开始 ---------- */
.cmd-card {
  border: 1px solid var(--border-light);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-surface-hover);
}

.cmd-header {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-light);
  background: color-mix(in srgb, var(--bg-surface) 80%, transparent);
}

.cmd-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.dot-red {
    background: #f43f5e;
  }

  &.dot-yellow {
    background: #f59e0b;
  }

  &.dot-green {
    background: #10b981;
  }
}

.cmd-title {
  margin-left: 8px;
  font-size: 12px;
}

.cmd-body {
  padding: 8px 14px;
}

.cmd-line {
  padding: 6px 0;
  border-bottom: 1px dashed var(--border-light);

  &:last-child {
    border-bottom: none;
  }
}

.cmd-text {
  font-family: 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  font-size: 13px;
  color: var(--text-body);
}
</style>
