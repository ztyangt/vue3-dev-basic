<script setup lang="ts">
import { useTheme } from '@/hooks/use-theme'
import { initStore } from '@/stores'
import { useEmitter } from '@/emitter'

initStore()
useTheme()
useEmitter()
</script>

<template>
  <RouterView />
</template>

<style></style>
