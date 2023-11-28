<script setup>
import { reactive } from 'vue';

import WTextField from './WTextField.vue';

const state = reactive({
  value: '',
  label: 'What are you looking for?',
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WTextField" group="Form">
    <Variant title="default">
      <WTextField v-model="state.value" :label="state.label" placeholder="Type here..." />
    </Variant>
    <Variant title="disabled">
      <WTextField v-model="state.value" :label="state.label" disabled placeholder="Type here..." />
    </Variant>
    <Variant title="error">
      <WTextField
        v-model="state.value"
        :disabled="state.disabled"
        :label="state.label"
        error
        placeholder="Type here..."
        error-message="Some error happens"
      />
    </Variant>
  </Story>
</template>
