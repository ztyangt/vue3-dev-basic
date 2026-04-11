<template>
  <div class="home-page wh-100">
    <HomeHeader />

    <div class="container">
      <!-- Hero 区 -->
      <div class="hero-section animate-up">
        <!-- <div class="badge">v1.0 Ready</div> -->
        <h1 class="hero-title">现代化前端开发<br /><span>开箱即用</span>的基础模板</h1>
        <p class="hero-desc">
          基于 Vue 3 + Vite + TypeScript
          构建，内置最佳实践、自动按需引入与完善的工程化配置，让你专注业务开发。
        </p>

        <div class="hero-actions">
          <button
            class="btn btn-primary"
            onclick="
              document.getElementById('code-showcase').scrollIntoView({ behavior: 'smooth' })
            "
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
            快速开始
          </button>
          <button
            class="btn btn-outline"
            onclick="
              document.getElementById('code-showcase').scrollIntoView({ behavior: 'smooth' })
            "
          >
            <svg viewBox="0 0 24 24">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            浏览目录结构
          </button>
        </div>
      </div>

      <!-- 技术栈标签区 -->
      <div class="tech-stack animate-up delay-100">
        <div class="tech-tag">Vue 3 API</div>
        <div class="tech-tag">Vite</div>
        <div class="tech-tag">TypeScript</div>
        <div class="tech-tag">Pinia</div>
        <div class="tech-tag">Vue Router</div>
        <div class="tech-tag">Element Plus</div>
        <div class="tech-tag">Axios</div>
        <div class="tech-tag">VueUse</div>
        <div class="tech-tag">Sass</div>
        <div class="tech-tag">Vitest</div>
      </div>

      <!-- 核心特性网格 -->
      <div class="grid-features animate-up delay-200">
        <div class="glass-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
          </div>
          <h3 class="feature-title">⚡️ 极速构建体验</h3>
          <p class="feature-desc">
            基于 Vite 构建，提供极速的冷启动和毫秒级的热更新 (HMR)，告别漫长的等待时间。
          </p>
        </div>

        <div class="glass-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24">
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              ></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h3 class="feature-title">📦 自动按需引入</h3>
          <p class="feature-desc">
            配置了 unplugin-auto-import 和 vue-components，Vue API、组件和 Element Plus
            全自动按需加载。
          </p>
        </div>

        <div class="glass-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
              <path d="M12 2v2"></path>
              <path d="M12 22v-2"></path>
              <path d="m17 20.66-1-1.73"></path>
              <path d="M11 10.27 7 3.34"></path>
              <path d="m20.66 17-1.73-1"></path>
              <path d="m3.34 7 1.73 1"></path>
              <path d="M14 12h8"></path>
              <path d="M2 12h2"></path>
              <path d="m20.66 7-1.73 1"></path>
              <path d="m3.34 17 1.73-1"></path>
              <path d="m17 3.34-1 1.73"></path>
              <path d="m11 13.73-4 6.93"></path>
            </svg>
          </div>
          <h3 class="feature-title">🔌 完善的网络封装</h3>
          <p class="feature-desc">
            完善的 Axios 封装，内置请求/响应拦截器、Token 无感刷新、全局错误处理与取消请求。
          </p>
        </div>

        <div class="glass-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24">
              <path d="m18 16 4-4-4-4"></path>
              <path d="m6 8-4 4 4 4"></path>
              <path d="m14.5 4-5 16"></path>
            </svg>
          </div>
          <h3 class="feature-title">🛠 实用自定义指令</h3>
          <p class="feature-desc">
            内置 v-ripple (波纹效果)、v-draggable (拖拽)、v-resize 等多个高频实用的 Vue 自定义指令。
          </p>
        </div>

        <div class="glass-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <h3 class="feature-title">🔍 DOM 源码审查</h3>
          <p class="feature-desc">
            集成 code-inspector-plugin，支持在浏览器点击页面元素，直接唤醒 IDE 并跳转到对应 Vue
            源码。
          </p>
        </div>

        <div class="glass-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24">
              <path d="M2 6h4"></path>
              <path d="M2 10h4"></path>
              <path d="M2 14h4"></path>
              <path d="M2 18h4"></path>
              <rect width="16" height="20" x="4" y="2" rx="2"></rect>
              <path d="M15 2v20"></path>
              <path d="M15 6h5"></path>
              <path d="M15 10h5"></path>
              <path d="M15 14h5"></path>
              <path d="M15 18h5"></path>
            </svg>
          </div>
          <h3 class="feature-title">🗂 规范的目录架构</h3>
          <p class="feature-desc">
            清晰合理的模块划分 (hooks, stores, apis,
            layouts)，支持多布局切换，降低大型项目维护成本。
          </p>
        </div>
      </div>

      <!-- 快速开始与目录展示区 (双栏 Grid) -->
      <div id="code-showcase" class="code-showcase-grid animate-up delay-300">
        <!-- 左侧：快速开始终端 -->
        <div class="terminal-card">
          <div class="terminal-header">
            <div class="mac-dot red"></div>
            <div class="mac-dot yellow"></div>
            <div class="mac-dot green"></div>
            <div
              style="
                margin-left: auto;
                font-size: 12px;
                color: #6b7280;
                font-family: var(--font-mono);
              "
            >
              bash
            </div>
          </div>
          <div class="terminal-body">
            <div class="cmd-line">
              <span class="cmd-text">git clone https://github.com/ztyangt/vue3-dev-basic.git</span>
              <span class="cmd-comment">// 1. 克隆代码</span>
            </div>
            <div class="cmd-line">
              <span class="cmd-text">cd vue3-dev-basic</span>
              <span class="cmd-comment">// 2. 进入目录</span>
            </div>
            <div class="cmd-line">
              <span class="cmd-text">npm install</span>
              <span class="cmd-comment">// 3. 安装依赖</span>
            </div>
            <div class="cmd-line" style="margin-top: 16px">
              <span class="cmd-text" style="color: #a5b4fc">npm run dev</span>
              <span class="cmd-comment">// 🚀 启动项目</span>
            </div>
            <div class="cmd-line" style="margin-top: 8px">
              <span class="cmd-text" style="color: #a5b4fc">npm run build</span>
              <span class="cmd-comment">// 📦 生产构建</span>
            </div>
          </div>
        </div>

        <!-- 右侧：目录结构展示 -->
        <div class="terminal-card">
          <div class="terminal-header">
            <div class="mac-dot red"></div>
            <div class="mac-dot yellow"></div>
            <div class="mac-dot green"></div>
            <div
              style="
                margin-left: auto;
                font-size: 12px;
                color: #6b7280;
                font-family: var(--font-mono);
              "
            >
              Project Structure
            </div>
          </div>
          <div class="terminal-body tree-view">
            <div><span class="dir">src/</span></div>
            <div>
              ├── <span class="dir">__tests__/</span> <span class="cmd-comment"># 单元测试</span>
            </div>
            <div>
              ├── <span class="dir">apis/</span> <span class="cmd-comment"># 接口请求</span>
            </div>
            <div>
              ├── <span class="dir">assets/</span> <span class="cmd-comment"># 静态资源</span>
            </div>
            <div>
              ├── <span class="dir">components/</span> <span class="cmd-comment"># 公共组件</span>
            </div>
            <div>
              ├── <span class="dir">directives/</span> <span class="cmd-comment"># 自定义指令</span>
            </div>
            <div>
              ├── <span class="dir">hooks/</span> <span class="cmd-comment"># 组合式函数</span>
            </div>
            <div>
              ├── <span class="dir">layouts/</span> <span class="cmd-comment"># 页面布局</span>
            </div>
            <div>
              ├── <span class="dir">router/</span> <span class="cmd-comment"># 路由配置</span>
            </div>
            <div>
              ├── <span class="dir">stores/</span> <span class="cmd-comment"># 状态管理</span>
            </div>
            <div>
              ├── <span class="dir">styles/</span> <span class="cmd-comment"># 全局样式</span>
            </div>
            <div>
              ├── <span class="dir">utils/</span> <span class="cmd-comment"># 工具函数</span>
            </div>
            <div>
              ├── <span class="dir">views/</span> <span class="cmd-comment"># 页面视图</span>
            </div>
            <div>
              ├── <span class="file">App.vue</span> <span class="cmd-comment"># 根组件</span>
            </div>
            <div>
              └── <span class="file">main.ts</span> <span class="cmd-comment"># 入口文件</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <div
        style="text-align: center; color: var(--text-muted); font-size: 14px; padding-bottom: 20px"
        class="animate-up delay-300"
      >
        <p>MIT Licensed | Copyright © {{ new Date().getFullYear() }} Vue3 Dev Basic</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks/use-theme'
import { ElMessage } from 'element-plus'
import HomeHeader from './components/HomeHeader.vue'
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px 40px;
}

/* Hero 区 */
.hero-section {
  text-align: center;
  padding: 60px 0;
  max-width: 800px;
  margin: 0 auto;
}
.badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  margin-bottom: 24px;
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
}
.hero-title {
  font-size: 56px;
  font-weight: 800;
  color: var(--text-heading);
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 24px;
}
.hero-title span {
  background: linear-gradient(135deg, var(--primary), var(--info));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-desc {
  font-size: 18px;
  color: var(--text-muted);
  margin-bottom: 40px;
}
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* 高级玻璃卡片基础 */
.glass-card {
  background: color-mix(in srgb, var(--bg-surface) 60%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--border-base) 80%, transparent);
  border-radius: var(--radius-2xl);
  padding: 32px;
  box-shadow:
    0 8px 32px -4px rgba(0, 0, 0, 0.08),
    0 0 0 1px color-mix(in srgb, var(--bg-surface) 50%, transparent) inset;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 40px -8px rgba(0, 0, 0, 0.12),
    0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent) inset;
}

/* 网格布局 */
.grid-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 80px;
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--primary) 10%, transparent);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-heading);
  margin-bottom: 8px;
}
.feature-desc {
  font-size: 14px;
  color: var(--text-muted);
}

/* 技术栈标签 */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 60px;
}
.tech-tag {
  padding: 8px 16px;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  border: 1px solid var(--border-base);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-heading);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}
.tech-tag:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* =========================================
       5. 终端及代码展示区
       ========================================= */
.code-showcase-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 0 auto 80px;
  max-width: 1000px;
}

.terminal-card {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 280px; /* ★ 固定统一高度，保持左右一致且不会太高 */
}
.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 20px;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}
.mac-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.mac-dot.red {
  background: #ff5f56;
}
.mac-dot.yellow {
  background: #ffbd2e;
}
.mac-dot.green {
  background: #27c93f;
}

.terminal-body {
  padding: 24px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: #a1a1aa;
  flex: 1;
  overflow-x: auto;
  overflow-y: auto; /* ★ 开启垂直滚动 */
}

/* ★ 终端内部自定义精美滚动条 */
.terminal-body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}
.terminal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}
.terminal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 命令行样式 */
.cmd-line {
  margin-bottom: 12px;
  display: flex;
  white-space: nowrap;
}
.cmd-line::before {
  content: '$';
  color: var(--primary);
  margin-right: 12px;
}
.cmd-text {
  color: var(--text-body);
}
.cmd-comment {
  color: #6b7280;
  font-style: italic;
  margin-left: auto;
  padding-left: 20px;
}

/* 目录树样式 */
.tree-view {
  line-height: 1.7;
  font-size: 13.5px;
  white-space: pre;
}
.tree-view .dir {
  color: #60a5fa;
  font-weight: 500;
}
.tree-view .file {
  color: #e4e4e7;
}

/* =========================================
       6. 按钮与全局杂项
       ========================================= */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border-radius: var(--radius-lg);
  border: none;
  transition: all 0.2s ease;
}
.btn-primary {
  background-color: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent);
}
.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.btn-outline {
  background: color-mix(in srgb, var(--bg-surface) 50%, transparent);
  border: 1px solid var(--border-base);
  color: var(--text-heading);
  backdrop-filter: blur(10px);
}
.btn-outline:hover {
  background: var(--bg-surface);
  border-color: var(--text-heading);
  transform: translateY(-2px);
}

/* 图标按钮 */
.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--bg-surface) 80%, transparent);
  border: 1px solid var(--border-base);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.icon-btn:hover {
  color: var(--text-heading);
  border-color: var(--text-muted);
}

/* 统一的 SVG 样式 */
svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 动画 */
.animate-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.delay-100 {
  animation-delay: 100ms;
}
.delay-200 {
  animation-delay: 200ms;
}
.delay-300 {
  animation-delay: 300ms;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(50px, -50px) scale(1.05);
  }
}

/* 响应式调整 */
@media (max-width: 900px) {
  .code-showcase-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  .hero-actions {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
  .cmd-comment {
    display: none;
  }
}
</style>
