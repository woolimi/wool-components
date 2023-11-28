<script setup>
defineProps({
  errorMessage: { type: String, default: '' },
});
</script>
<template>
  <sub v-if="errorMessage" class="bottom-0 ml-[20px] text-[13px] wc-error-text">
    {{ errorMessage }}
  </sub>
</template>
