<script setup>
const props = defineProps({
  disabled: { type: Boolean, default: false },
  for: { type: String, default: '' },
});
</script>
<template>
  <label
    :for="props.for"
    :class="{ ['!cursor-not-allowed wc-disabled-text']: disabled }"
    class="wc-base mb-2 inline-block cursor-pointer font-[500]"
  >
    <slot />
  </label>
</template>
