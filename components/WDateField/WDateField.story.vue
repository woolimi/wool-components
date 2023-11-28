<script setup lang="ts">
import { ref } from 'vue';

import WDateField from './WDateField.vue';
const initState = () => {
  return {
    value: undefined,
    label: 'Choose a date',
    format: 'dd/MM/yyyy',
    errorMessage: '',
  };
};
const errorMessage = ref('');
const onError = (error: boolean) => {
  if (error) errorMessage.value = 'Invalid date';
  else errorMessage.value = '';
};
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WDateField" group="Form">
    <Variant :init-state="initState" title="default">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDateField v-model="state.value" :label="state.label" :error-message="errorMessage" @error="onError" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="locale = de">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDateField v-model="state.value" :label="state.label" locale="de" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="locale = ko">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDateField v-model="state.value" :label="state.label" locale="ko" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="disabled">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDateField v-model="state.value" :label="state.label" disabled />
      </template>
    </Variant>
  </Story>
</template>
