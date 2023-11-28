<script lang="ts" setup>
import { computed, onUnmounted, PropType, provide, toRef } from 'vue';

import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';
import type { FormatterFunc, Position, SliderStep, TooltipDisplay } from '@/types';

import Slider from './components/Slider.vue';
const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  steps: {
    type: Array as PropType<SliderStep[]>,
    required: true,
  },
  tooltipPlacement: {
    type: String as PropType<Position>,
    default: undefined,
  },
  tooltip: {
    type: String as PropType<TooltipDisplay>,
    default: 'always',
  },
  tooltipFormatter: {
    type: [String, Function] as PropType<string | FormatterFunc>,
    default: undefined,
  },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });
provide('isPlaying', isPlaying);
provide('playMeh', playMeh);

onUnmounted(() => {
  deletePlaying();
});
</script>

<template>
  <Slider
    v-model="value"
    :steps="props.steps"
    :disabled="disabled"
    :tooltip="tooltip"
    :tooltip-placement="tooltipPlacement"
    :tooltip-formatter="tooltipFormatter"
  />
</template>
