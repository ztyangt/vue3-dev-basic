<template>
  <div class="layout-main relative">
    <div class="bg-pattern-layer"></div>
    <div class="ambient-blob blob-1"></div>
    <div class="ambient-blob blob-2"></div>
    <div class="ambient-blob blob-3"></div>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <KeepAlive v-if="!route.meta.noKeepAlive">
          <component :is="Component" :key="route.path"></component>
        </KeepAlive>
        <component v-else :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-main {
  min-height: 100vh;
  overflow-x: hidden;
  .bg-pattern-layer {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: radial-gradient(var(--border-base) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
    transition: background-image 0.3s ease;
  }

  .blob-1 {
    top: -10%;
    left: 10%;
    width: 500px;
    height: 500px;
    background: var(--primary);
    opacity: 0.25;
  }
  .blob-2 {
    top: 20%;
    right: -5%;
    width: 400px;
    height: 400px;
    background: var(--info);
    opacity: 0.15;
    animation-delay: 2s;
  }
  .blob-3 {
    bottom: 10%;
    left: 30%;
    width: 600px;
    height: 600px;
    background: var(--success);
    opacity: 0.15;
    animation-delay: 4s;
  }

  .ambient-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
    animation: blob 15s infinite alternate;
  }
}
</style>
