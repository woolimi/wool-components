<script setup lang="ts">
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  limitShift,
  offset,
  shift,
} from '@floating-ui/dom';
import { assign, split } from 'lodash-es';
import { onBeforeUnmount, onMounted, PropType, ref, useSlots, watch } from 'vue';

import type { Position } from '../../../types';

const props = defineProps({
  placement: {
    type: String as PropType<Position>,
    default: 'top',
  },
  display: {
    type: String as PropType<'always' | 'hover' | 'never'>,
    default: 'hover',
  },
});

const isFloatingElVisible = ref(props.display === 'always');
const targetEl = ref<HTMLElement>();
const floatingEl = ref<HTMLElement>();
const arrowEl = ref<HTMLElement>();

const computeTooltipPosition = async () => {
  if (!targetEl.value || !floatingEl.value) return;

  const { x, y, middlewareData, placement } = await computePosition(
    targetEl.value,
    floatingEl.value,
    {
      placement: props.placement,
      middleware: [
        offset(10),
        flip(),
        shift({ limiter: limitShift(), padding: 5 }),
        ...(arrowEl.value ? [arrow({ element: arrowEl.value, padding: 5 })] : []),
      ],
    },
  );

  assign(floatingEl.value.style, {
    left: `${x}px`,
    top: `${y}px`,
  });

  if (!middlewareData.arrow || !arrowEl.value) return;

  const { x: arrowX, y: arrowY } = middlewareData.arrow;

  const side = split(placement, '-')[0];
  const oppositeSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[side];
  const transformAttrs: Record<string, string> = {
    top: 'translate(0%, 3px) rotate(180deg)',
    right: 'translate(-50%, 0) rotate(270deg)',
    bottom: 'translate(0, -50%) rotate(0deg)',
    left: 'translate(12px, 0) rotate(90deg)',
  };

  assign(arrowEl.value.style, {
    left: x != null ? `${arrowX}px` : '',
    top: y != null ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    ...(!!oppositeSide && { [oppositeSide]: '-4px' }),
    [side]: '',
    transform: transformAttrs[side],
  });
};

let cleanup: () => void;

watch(isFloatingElVisible, (val) => {
  if (val) {
    if (!targetEl.value || !floatingEl.value) return;

    cleanup = autoUpdate(targetEl.value, floatingEl.value, computeTooltipPosition, {
      animationFrame: true,
    });
    return;
  }

  if (!cleanup) return;

  cleanup();
});

const { content } = useSlots();

const onMouseEnter = () => {
  if (props.display !== 'hover' || !content) return;
  isFloatingElVisible.value = true;
};

const onMouseLeave = () => {
  if (props.display !== 'hover') return;
  isFloatingElVisible.value = false;
};

onMounted(() => {
  if (props.display !== 'always' || !targetEl.value || !floatingEl.value) return;
  cleanup = autoUpdate(targetEl.value, floatingEl.value, computeTooltipPosition, {
    animationFrame: true,
  });
});

onBeforeUnmount(() => {
  if (!cleanup) return;
  cleanup();
});
</script>

<template>
  <div class="relative flex items-center justify-center">
    <div
      ref="targetEl"
      class="inline-flex cursor-pointer items-center justify-center"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="target" />
    </div>

    <div ref="floatingEl" :class="[$style.floating, isFloatingElVisible && $style.floatingVisible]">
      <div ref="arrowEl" :class="$style.arrow" />
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" module>
.floating {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;

  color: black;
  text-align: left;

  visibility: hidden;
  background: white;
  box-shadow: 0px 2px 12px rgba(44, 35, 2, 0.3);

  &.floatingVisible {
    max-width: 256px;
    padding: 8px 12px;
    visibility: visible;
    border-radius: 8px;
  }
}

.arrow {
  position: absolute;

  width: 24px;
  height: 8px;

  background: white;

  -webkit-mask-image: url('@/assets//tooltip-tail.svg');
  mask-image: url('@/assets/tooltip-tail.svg');
}
</style>
