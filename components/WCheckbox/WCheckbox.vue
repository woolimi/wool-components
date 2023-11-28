<script setup lang="ts">
import { onUnmounted, ref, toRef } from 'vue';

import WLabel from '@/components/WLabel';
import WSheep from '@/components/WSheep';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: Boolean, default: false },
  text: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});
const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });
const emit = defineEmits(['update:modelValue']);
const input = ref<HTMLInputElement>();

const onChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
    input.value?.focus();
    playMeh();
  }
};
onUnmounted(() => {
  deletePlaying();
});
</script>
<template>
  <div class="wc-base">
    <WLabel v-if="label" :for="id" :disabled="disabled">
      {{ label }}
    </WLabel>
    <div
      :class="{
        ['wc-active-bg except-touch:hover:wc-active-hover-bg']: !disabled && modelValue,
        ['wc-bg except-touch:hover:wc-hover-bg']: !disabled && !modelValue,
        ['!cursor-not-allowed wc-disabled-text wc-disabled-bg wc-disabled-border except-touch:hover:wc-disabled-bg']:
          disabled,
      }"
      class="mx-1 my-1 flex cursor-pointer items-center gap-2 px-2 py-1 transition-all wc-text wc-border wc-rounded focus-within:wc-focus"
      @click="onChange"
    >
      <WSheep
        :class="{ ['wc-active-path hover:wc-active-hover-path']: modelValue }"
        :meh="isPlaying"
        :disabled="disabled"
        class="sheepButton pointer-events-none transition-all"
      />
      <span v-if="text" class="pointer-events-none">
        {{ text }}
      </span>
      <input
        :id="id"
        ref="input"
        v-bind="$attrs"
        :checked="modelValue"
        :disabled="disabled"
        type="checkbox"
        class="absolute h-0 w-0 opacity-0"
      />
    </div>
  </div>
</template>
