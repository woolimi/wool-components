<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { includes, indexOf, isUndefined, map, pull } from 'lodash-es';
import { computed, inject, onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue';

import { useUtils } from '@/composables/useUtils';
import {
  FormatterFunc,
  Position,
  SliderState,
  SliderStep,
  SliderStepMeta,
  TooltipDisplay,
} from '@/types';

import SliderDot from './SliderDot.vue';
import SliderSteps from './SliderSteps.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
  disabled: { type: Boolean, default: false },
  steps: {
    type: Array as PropType<SliderStep[]>,
    required: true,
  },
  tooltip: {
    type: String as PropType<TooltipDisplay>,
    default: 'active',
  },
  tooltipPlacement: {
    type: String as PropType<Position>,
    default: undefined,
  },
  tooltipFormatter: {
    type: [String, Function] as PropType<string | FormatterFunc>,
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue']);

const dotPos = ref(0);
const dotValue = ref<number>();
const data = ref<number[]>([]);
const states = ref<SliderState[]>([]);
const container = ref<HTMLDivElement>();
const scale = ref(1);

const total = computed(() => data.value.length - 1);
const gap = computed(() => 100 / total.value);
const playMeh = inject('playMeh') as () => void;

const { getSize, getMousePos, calibratePos, divideDecimals, multiplyDecimals } = useUtils();

const setDotPos = (pos: number) => {
  if (pos === dotPos.value) return;

  dotPos.value = pos;
  dotValue.value = parsePos(pos);
};

const getValueByIndex = (index: number) => {
  if (index < 0) index = 0;
  else if (index > total.value) index = total.value;

  return data.value ? data.value[index] : index;
};

/** Calculate the value by position */
const parsePos = (pos: number) => {
  const index = Math.round(pos / gap.value);
  return getValueByIndex(index);
};

/** Calculate the position of the slider by value */
const getPosByValue = (val?: number): number => {
  if (isUndefined(val)) return 0;

  const index = indexOf(data.value, val);

  const pos = multiplyDecimals(index, gap.value);
  return calibratePos(pos);
};

const setDot = (value?: number) => {
  dotValue.value = value;
  dotPos.value = getPosByValue(value);
};

const initSlider = (options: { value?: number; data: number[] }) => {
  data.value = options.data;
  setDot(options.value);
};

const defaultSliderSize = 8;
const containerStyles = computed(() => {
  let containerWidth: string;
  if (!isUndefined(props.width)) containerWidth = getSize(props.width);
  else containerWidth = 'auto';

  let containerHeight: string;
  if (!isUndefined(props.height)) containerHeight = getSize(props.height);
  else containerHeight = getSize(defaultSliderSize);

  return {
    width: containerWidth,
    height: containerHeight,
  };
});

const stepsArray = computed<SliderStepMeta[]>(() =>
  map(props.steps, (step, stepIndex) => {
    const selectedStepIndex = indexOf(map(props.steps, 'value'), dotValue.value);
    const metaProps = {
      active: stepIndex >= 0 && stepIndex <= selectedStepIndex,
      pos: getPosByValue(step.value),
    };
    return { ...step, ...metaProps };
  }),
);

const animateTime = computed(() => {
  if (includes(states.value, SliderState.DRAG)) return 0;

  return 0.3;
});

const progressStyle = computed(() => {
  const [start, end] = [0, dotPos.value];
  const sizeStyleKey = 'width';
  return {
    ['height']: '100%',
    ['top']: 0,
    [mainDirection.value]: `${calibratePos(start)}%`,
    [sizeStyleKey]: `${calibratePos(end - start)}%`,
    transitionProperty: `${sizeStyleKey}, ${mainDirection.value}`,
    transitionDuration: `${animateTime.value}s`,
  };
});

const mainDirection = computed(() => 'left');

const dotStyle = computed(() => {
  const calibratedPos = calibratePos(dotPos.value);
  return {
    [mainDirection.value]: `${calibratedPos}%`,
    transition: `${mainDirection.value} ${animateTime.value}s`,
  };
});

const sliderData = computed(() => map(props.steps, ({ value }) => value));

const setScale = () => {
  if (!container.value) return;
  scale.value = divideDecimals(Math.floor(container.value.offsetWidth), 100);
};

const syncValueByPos = () => {
  if (includes(states.value, SliderState.DRAG)) return;

  emit('update:modelValue', dotValue.value);
  dotPos.value = getPosByValue(dotValue.value);
};

const dragStart = () => {
  setScale();
  states.value.push(SliderState.DRAG);
  states.value.push(SliderState.FOCUS);
  playMeh();
};

const dragMove = (e: MouseEvent | TouchEvent) => {
  if (!includes(states.value, SliderState.DRAG)) {
    return false;
  }
  e.preventDefault();

  const pos = getPosByEvent(e);
  if (isUndefined(pos)) return;

  setDotPos(pos);
  syncValueByPos();
};

const dragEnd = (e: MouseEvent | TouchEvent) => {
  if (!includes(states.value, SliderState.DRAG)) {
    return false;
  }

  setTimeout(() => {
    pull(states.value, SliderState.DRAG);

    syncValueByPos();

    if ('targetTouches' in e) {
      pull(states.value, SliderState.FOCUS);
    }
  });
};

const blurHandle = (e: MouseEvent) => {
  if (!includes(states.value, SliderState.DRAG) || container.value?.contains(e.target as Node))
    return false;
  pull(states.value, SliderState.FOCUS);
};

const clickHandle = (e: MouseEvent | TouchEvent) => {
  if (props.disabled || includes(states.value, SliderState.DRAG)) return false;

  setScale();

  const pos = getPosByEvent(e);
  if (isUndefined(pos)) return;

  setValueByPos(pos);
};

const focus = () => {
  states.value.push(SliderState.FOCUS);
};

const blur = () => {
  pull(states.value, SliderState.FOCUS);
};

const setValueByPos = (pos: number) => {
  if (props.disabled) {
    return false;
  }
  setDotPos(pos);
  syncValueByPos();
  playMeh();
};

const getPosByEvent = (e: MouseEvent | TouchEvent) => {
  if (!container.value) return;

  return getMousePos(e, container.value)['x'] / scale.value;
};

const bindEvent = () => {
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('touchend', dragEnd, { passive: false });
  document.addEventListener('mousedown', blurHandle);
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('mouseleave', dragEnd);
};
const unbindEvent = () => {
  document.removeEventListener('touchmove', dragMove);
  document.removeEventListener('touchend', dragEnd);
  document.removeEventListener('mousedown', blurHandle);
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);
  document.removeEventListener('mouseleave', dragEnd);
};

initSlider({
  value: props.modelValue,
  data: sliderData.value,
});
onMounted(bindEvent);
onBeforeUnmount(unbindEvent);

watch(
  () => props.modelValue,
  (val) => {
    if (includes(states.value, SliderState.DRAG)) return;
    setDot(val);
  },
);
</script>

<template>
  <div
    ref="container"
    :style="containerStyles"
    class="wc-base relative select-none py-20"
    @click="clickHandle"
  >
    <div
      :class="{ ['!cursor-not-allowed']: disabled }"
      class="relative mx-[24px] h-[12px] cursor-pointer bg-gray-100 wc-rounded"
    >
      <div
        :class="[{ ['bg-gray-300 wc-text']: disabled, ['wc-active-bg']: !disabled }]"
        :style="progressStyle"
        class="z-1 absolute transition-colors duration-300 wc-rounded"
      />
      <SliderSteps :steps="stepsArray" :disabled="disabled" @press-label="setValueByPos" />
      <SliderDot
        :disabled="disabled"
        :value="dotValue"
        :tooltip="tooltip"
        :tooltip-formatter="tooltipFormatter"
        :tooltip-placement="tooltipPlacement ? tooltipPlacement : 'top'"
        :style="dotStyle"
        role="slider"
        @drag-start="dragStart"
        @focus="focus"
        @blur="blur"
      />
    </div>
  </div>
</template>
