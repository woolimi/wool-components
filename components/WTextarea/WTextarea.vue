<script setup lang="ts">
import { onUnmounted, toRef } from 'vue';

import { WLabel, WSheep } from '@/components';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  maxlength: { type: Number, default: 150 },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });

onUnmounted(() => {
  deletePlaying();
});
</script>
<template>
  <div class="wc-base">
    <WLabel :disabled="disabled" :for="id">{{ label }}</WLabel>
    <div class="relative flex">
      <WSheep :meh="isPlaying" :disabled="disabled" class="absolute top-[15px]" />
      <div class="flex flex-grow flex-col">
        <textarea
          :id="id"
          :value="modelValue"
          :rows="rows"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :disabled="disabled"
          class="wc-scrollbar m-1 ml-[20px] w-[calc(100%-28px)] bg-white p-4 pl-6 text-black wc-border wc-rounded focus:wc-focus disabled:cursor-not-allowed disabled:wc-disabled-text disabled:wc-disabled-bg"
          @input="onInput"
          @focus="playMeh"
        >
        </textarea>
        <sub class="block p-2 text-right">
          {{ modelValue?.length }} / <span class="text-[14px] font-bold">{{ maxlength }}</span>
        </sub>
      </div>
    </div>
  </div>
</template>
