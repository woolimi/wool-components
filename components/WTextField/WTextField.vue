<script setup lang="ts">
import { PropType } from 'vue';

import WError from '@/components/WError';
import WInput from '@/components/WInput';
import WLabel from '@/components/WLabel';
import { useIds } from '@/composables/useIds';
import { InputType } from '@/types';

defineProps({
  label: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  type: { type: String as PropType<InputType>, default: InputType.TEXT },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: undefined },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue']);
const id = useIds().get();
const onInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="wc-base">
    <WLabel v-if="label" :for="id" :disabled="disabled">
      {{ label }}
    </WLabel>
    <WInput
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      @input="onInput"
    />
    <WError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>
