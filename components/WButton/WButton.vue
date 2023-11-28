<script setup lang="ts">
import { computed, onUnmounted, toRef } from 'vue';

import WSheep from '@/components/WSheep';
import { useColors } from '@/composables/useColors';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
});
const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });
const { generateCustomColors, generateDefaultColors } = useColors();
const palette = computed(() =>
  props.color ? generateCustomColors(props.color) : generateDefaultColors(),
);

onUnmounted(() => {
  deletePlaying();
});
const onClick = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  target.focus();
  playMeh();
};
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="{
      ['wc-base wc-bg hover:wc-hover-bg disabled:wc-disabled-text disabled:wc-disabled-bg disabled:wc-disabled-border']:
        !palette,
      [$style.custom]: palette,
      [$style.test]: true,
    }"
    :disabled="disabled"
    class="relative my-1 ml-[20px] mr-1 inline-block px-4 py-3 pl-6 transition-all wc-border wc-rounded focus:wc-focus disabled:cursor-not-allowed"
    @click="onClick"
  >
    <WSheep
      :meh="isPlaying"
      :disabled="disabled"
      class="absolute left-[-20px] top-[50%] -translate-y-1/2"
    />
    <slot />
  </component>
</template>

<style module lang="scss">
.custom {
  color: v-bind('`${palette?.text}`');
  background-color: v-bind('`${palette?.background}`');
  border-color: v-bind('`${palette?.border}`');

  &:hover {
    background-color: v-bind('`${palette?.hoverBackground}`');
  }
  &:disabled {
    color: v-bind('`${palette?.disabledText}`');
    background-color: v-bind('`${palette?.disabledBackground}`');
    border-color: v-bind('`${palette?.disabledBorder}`');
  }
}
.test:focus,
.test:focus-visible,
.test:active {
  border: 2px solid black;
  outline: none;
  box-shadow: 0 0 0 4px #7dd3fc;
}
</style>
