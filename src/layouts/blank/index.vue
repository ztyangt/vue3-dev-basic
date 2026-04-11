<template>
  <div class="layout-blank">
    <div class="bg-grid-layer"></div>
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
.layout-blank {
  height: 100vh;

  .ambient-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
    animation: blob 10s infinite;
  }

  .blob-1 {
    top: -10%;
    left: -10%;
    width: 40vw;
    height: 40vw;
    background: var(--primary);
    opacity: 0.3;
  }

  .blob-2 {
    top: 10%;
    right: -5%;
    width: 35vw;
    height: 35vw;
    background: var(--info);
    opacity: 0.2;
    animation-delay: 2s;
  }

  .blob-3 {
    bottom: -10%;
    left: 20%;
    width: 30vw;
    height: 30vw;
    background: var(--success);
    opacity: 0.2;
    animation-delay: 4s;
  }
}
</style>
