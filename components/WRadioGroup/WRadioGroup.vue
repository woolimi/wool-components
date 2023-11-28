<script setup>
import { computed, provide } from 'vue';

import WLabel from '@/components/WLabel';

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], required: true },
  name: { type: String, required: true },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);
provide(
  'radioGroupDisabled',
  computed(() => props.disabled),
);
provide('radioGroupName', props.name);
provide(
  'radioGroupModel',
  computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  }),
);
</script>
<template>
  <div class="wc-base">
    <WLabel v-if="label" :disabled="disabled">
      {{ label }}
    </WLabel>
    <slot />
  </div>
</template>
