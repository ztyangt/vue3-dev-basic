<template>
  <svg :style="{ width: `${size}px`, height: `${size}px` }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  size: {
    type: [Number, String],
    default: 16,
  },
})
</script>
<style scoped></style>
