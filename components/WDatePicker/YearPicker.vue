<script setup lang="ts">
import { filter, map, pipe, range, reverse, toArray } from '@fxts/core';
import { useScroll } from '@vueuse/core';
import { nextTick, onBeforeMount, onMounted, ref, toRefs, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: undefined,
  },
  max: {
    type: Number,
    default: undefined,
  },
});
const emit = defineEmits(['update:modelValue', 'close']);
const DEFAULT_SCROLL_ITEMS = 24;

const pickerEl = ref<HTMLElement>();
const SCROLL_THRESHOLD = 400;
const SELECT_HEIGHT = 32;
const { y, arrivedState } = useScroll(pickerEl, {
  offset: { top: SCROLL_THRESHOLD, bottom: SCROLL_THRESHOLD },
});
const yearsInScroll = ref<number[]>([]);
const yearEls = ref<HTMLElement[]>([]);

const onClick = (year: number) => {
  emit('update:modelValue', year);
  emit('close');
};
const { top, bottom } = toRefs(arrivedState);

const getYearsBeforeScroll = (length: number, centerYear: number) =>
  pipe(
    range(length),
    map((i) => centerYear - i - 1),
    filter((v) => (!props.min || v >= props.min) && (!props.max || v <= props.max)),
    reverse,
    toArray,
  );

const getYearsAfterScroll = (length: number, centerYear: number) =>
  pipe(
    range(length),
    map((i) => centerYear + i + 1),
    filter((v) => (!props.min || v >= props.min) && (!props.max || v <= props.max)),
    toArray,
  );

onBeforeMount(() => {
  const bef = getYearsBeforeScroll(DEFAULT_SCROLL_ITEMS, props.modelValue);
  const aft = getYearsAfterScroll(DEFAULT_SCROLL_ITEMS, props.modelValue);

  yearsInScroll.value = [...bef, props.modelValue, ...aft];
});

watch(
  () => [top.value, bottom.value],
  ([arrivedTop, arrivedBottom]) => {
    const _y = y.value;

    if (arrivedTop) {
      const bef = getYearsBeforeScroll(DEFAULT_SCROLL_ITEMS, yearsInScroll.value[0]);
      if (bef.length) {
        yearsInScroll.value = [...bef, ...yearsInScroll.value];
        nextTick(() => (y.value = _y + SELECT_HEIGHT * bef.length));
      }
    }

    if (arrivedBottom) {
      const aft = getYearsAfterScroll(
        DEFAULT_SCROLL_ITEMS,
        yearsInScroll.value.at(-1) || props.modelValue,
      );
      if (aft.length) {
        yearsInScroll.value = [...yearsInScroll.value, ...aft];
      }
    }
  },
);

onMounted(() => {
  const idx = yearsInScroll.value.indexOf(props.modelValue);
  yearEls.value[idx]?.scrollIntoView({ block: 'center' });
});
</script>
<template>
  <div>
    <ul ref="pickerEl" class="wc-scrollbar flex h-[220px] flex-col overflow-y-auto">
      <li v-for="year in yearsInScroll" :key="year" ref="yearEls" class="px-1">
        <button
          :style="{ height: `${SELECT_HEIGHT}px` }"
          :class="{ ['text-white wc-active-bg hover:wc-active-hover-bg']: year === modelValue }"
          class="w-full p-1 text-center text-black wc-rounded hover:wc-hover-bg"
          @click="onClick(year)"
        >
          {{ year }}
        </button>
      </li>
    </ul>
  </div>
</template>
