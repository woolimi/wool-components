<script setup lang="ts">
import { onUnmounted, toRef } from 'vue';

import WSheep from '@/components/WSheep';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});
const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });
const emit = defineEmits(['update:modelValue']);
const onClick = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
    playMeh();
  }
};
onUnmounted(() => {
  deletePlaying();
});
</script>
<template>
  <div
    :class="{
      ['!wc-active-bg']: modelValue,
      ['!cursor-not-allowed !wc-disabled-bg wc-disabled-border']: disabled,
    }"
    class="wc-transition relative mx-4 my-3 h-[20px] w-[60px] cursor-pointer transition-colors duration-500 wc-border wc-rounded wc-disabled-bg focus-within:wc-focus"
    @click="onClick"
  >
    <span
      :class="{ ['left-[90%]']: modelValue }"
      class="absolute left-[10%] top-[50%] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
    >
      <WSheep :class="{ ['path-gray-200']: disabled }" :meh="isPlaying" :disabled="disabled" />
    </span>
    <input
      v-bind="$attrs"
      :checked="modelValue"
      :disabled="disabled"
      type="checkbox"
      class="absolute h-0 w-0 opacity-0"
    >
  </div>
</template>
