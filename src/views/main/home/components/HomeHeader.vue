<template>
  <nav class="nav-bar">
    <div class="nav-logo flex-yc">
      <img :src="config.logo" alt="logo" style="width: 30px; height: 30px" />
      <div class="title-color fw-600 fs-20 ml-10">{{ config.title }}</div>
    </div>
    <div style="display: flex; gap: 12px">
      <a
        href="https://github.com/ztyangt/vue3-dev-basic"
        target="_blank"
        class="icon-btn pointer"
        title="GitHub"
      >
        <svg-icon name="github" size="40" />
      </a>
      <el-button
        plain
        size="default"
        @click="toggleTheme"
        class="theme-btn icon-btn pointer"
        circle
        style="width: 40px"
      >
        <template #icon>
          <Moon :size="30" v-if="!isDark" />
          <Sun :size="30" v-else />
        </template>
      </el-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useConfigStore } from '@/stores/config'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from '@lucide/vue'

const { toggleTheme, isDark } = useTheme()

const configStore = useConfigStore()
const { config } = toRefs(configStore)
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 50;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid color-mix(in srgb, var(--border-base) 50%, transparent);
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-base);
  color: var(--text-muted);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
</style>
