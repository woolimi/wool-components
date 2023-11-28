<script setup>
import { reactive } from 'vue';

import WEmailField from './WEmailField.vue';

const state = reactive({
  label: 'Email',
  value: '',
  placeholder: 'example@email.com',
  errorMessage: '',
});
const onError = (isError) => {
  state.errorMessage = isError ? 'Invalid email' : '';
};
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WEmailField" group="Form">
    <Variant title="default">
      <WEmailField v-model="state.value" :error-message="state.errorMessage" :label="state.label" :placeholder="state.placeholder" @error="onError" />
    </Variant>
    <Variant title="disabled">
      <WEmailField v-model="state.value" :label="state.label" :placeholder="state.placeholder" disabled />
    </Variant>
  </Story>
</template>
