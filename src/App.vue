<script setup lang="ts">
import { useTheme } from '@/hooks/use-theme'

const { isDark } = useTheme()
</script>

<template>
  <RouterView />
</template>

<style></style>
