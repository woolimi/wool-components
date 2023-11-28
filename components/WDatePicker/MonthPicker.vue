<script setup lang="ts">
import { computed } from 'vue';

import { useDateTime } from '@/composables/useDateTime';

const props = defineProps({
  modelValue: { type: Number, default: undefined },
  locale: { type: String, default: 'en' },
  min: { type: Number, default: undefined },
  max: { type: Number, default: undefined },
});
const emit = defineEmits(['update:modelValue', 'close']);
const { getMonths } = useDateTime();
const months = computed(() => getMonths(props.locale));

const onClick = (idx: number) => {
  emit('update:modelValue', idx);
  emit('close');
};
</script>
<template>
  <div>
    <ul class="grid grid-cols-3 gap-x-1 gap-y-3">
      <li v-for="(month, idx) in months" :key="month" class="flex items-center justify-center">
        <button
          :class="{ ['text-white wc-active-bg hover:wc-active-hover-bg']: modelValue === idx }"
          :disabled="(min !== undefined && idx < min) || (max !== undefined && idx > max)"
          class="w-full py-3 uppercase wc-rounded hover:wc-hover-bg disabled:text-gray-300 disabled:hover:bg-inherit"
          @click="onClick(idx)"
        >
          {{ month }}
        </button>
      </li>
    </ul>
  </div>
</template>
