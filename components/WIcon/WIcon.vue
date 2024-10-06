<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'default',
  },
  path: { type: String, required: true },
});
</script>

<template>
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>
<style scoped>
path {
  fill: currentColor;
}
</style>
