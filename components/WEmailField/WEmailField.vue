<script setup lang="ts">
import { AtSymbolIcon } from '@heroicons/vue/24/solid';
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';

import { WError, WInput, WLabel } from '@/components';
import { useIds } from '@/composables/useIds';
import { InputType } from '@/types';

const EMAIL_REGEX = /^[^@\s]{1,64}@[^@\s]{1,127}\.[^@\s]{2,63}$/;
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  errorMessage: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'error']);
const id = useIds().get();

const onInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
watchDebounced(
  () => props.modelValue,
  (_mv) => {
    if (!_mv) emit('error', false);
    else if (!EMAIL_REGEX.test(_mv)) emit('error', true);
    else emit('error', false);
  },
  { debounce: 800 },
);
const inputEl = ref<typeof WInput>();
</script>
<template>
  <div class="wc-base">
    <WLabel :for="id">
      {{ label }}
    </WLabel>
    <WInput
      :id="id"
      ref="inputEl"
      :value="modelValue"
      :disabled="disabled"
      :type="InputType.EMAIL"
      :placeholder="placeholder"
      :error="!!errorMessage"
      @input="onInput"
    >
      <template #append>
        <AtSymbolIcon />
      </template>
    </WInput>
    <WError :error-message="errorMessage" />
  </div>
</template>
