<script setup lang="ts">
import { isUndefined } from 'lodash-es';
import { computed, ComputedRef, PropType } from 'vue';
import { inject } from 'vue';

import { WSheep } from '@/components';
import type { FormatterFunc, Position, TooltipDisplay } from '@/types';

import SliderTooltip from './SliderTooltip.vue';

const props = defineProps({
  value: { type: Number, default: undefined },
  disabled: { type: Boolean, default: false },
  tooltip: {
    type: String as PropType<TooltipDisplay>,
    default: 'always',
  },
  tooltipPlacement: {
    type: String as PropType<Position>,
    default: 'top',
  },
  tooltipFormatter: {
    type: [String, Function] as PropType<string | FormatterFunc>,
    default: '{value}',
  },
});

const emit = defineEmits(['drag-start']);
const isPlaying = inject('isPlaying') as ComputedRef<boolean>;
const dragStart = () => {
  if (props.disabled) {
    return false;
  }
  emit('drag-start');
};

const showTooltip = computed(() => {
  if (isUndefined(props.value)) return false;
  switch (props.tooltip) {
    case 'always':
    case 'hover':
      return true;
    case 'never':
      return false;
    default:
      return false;
  }
});

const formattedTooltipValue = computed(() => {
  if (isUndefined(props.value)) return;
  if (typeof props.tooltipFormatter === 'string')
    return props.tooltipFormatter.replace(/\{value\}/, String(props.value));
  return props.tooltipFormatter(props.value);
});
</script>

<template>
  <SliderTooltip
    :placement="tooltipPlacement"
    :display="tooltip"
    class="z-1 absolute -top-1/2 left-0 w-fit -translate-x-1/2 -translate-y-1/2"
    @mousedown.passive="dragStart"
    @touchstart.passive="dragStart"
  >
    <template #target>
      <button
        :disabled="disabled"
        class="rounded-[50%] p-[2px] transition-all duration-100 hover:scale-110 focus:bg-sky-400 focus:outline-none disabled:cursor-not-allowed"
      >
        <WSheep :meh="isPlaying" :disabled="disabled" />
      </button>
    </template>
    <template v-if="showTooltip" #content>
      <span>
        {{ formattedTooltipValue }}
      </span>
    </template>
  </SliderTooltip>
</template>
