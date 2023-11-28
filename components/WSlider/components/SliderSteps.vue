<script setup lang="ts">
import { PropType } from 'vue';

import type { SliderStepMeta } from '@/types';

const props = defineProps({
  steps: {
    type: Array as PropType<SliderStepMeta[]>,
    required: true,
  },
  disabled: { type: Boolean, default: false },
  focus: { type: Boolean, default: false },
});

const emit = defineEmits(['press-label']);

const handleMarkClick = (e: MouseEvent | TouchEvent, pos: number) => {
  e.stopPropagation();
  emit('press-label', pos);
};

const getStyles = (index: number) => {
  const gap = 100 / (props.steps.length - 1);
  return { left: `${index * gap}%` };
};
</script>

<template>
  <div class="relative h-full w-full">
    <div
      v-for="(step, index) in steps"
      :key="`mark-${index}`"
      :class="[{ ['!cursor-not-allowed']: disabled }]"
      :style="getStyles(index)"
      class="z-1 absolute top-1/2 h-full w-0 cursor-pointer"
      @click="handleMarkClick($event, step.pos)"
    >
      <div
        v-if="step.label"
        :class="{
          ['wc-active-text before:wc-active-bg']: step.active && !disabled,
          ['text-gray-400 before:bg-gray-400']: step.active && disabled,
          ['text-gray-300 before:bg-gray-300']: !step.active,
        }"
        class="absolute left-0 top-[10px] mt-[10px] flex w-[2px] translate-y-0 flex-col items-center gap-2 whitespace-nowrap font-bold before:block before:h-[10px] before:w-[2px] before:rounded-[1px]"
      >
        {{ step.label }}
      </div>
    </div>
  </div>
</template>
