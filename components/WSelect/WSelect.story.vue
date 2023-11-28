<script setup>
import { reactive } from 'vue';

import WSelect from './WSelect.vue';

const state = reactive({
  modelValue: undefined,
  options: [
    { text: 'Option 1', value: 1 },
    { text: 'Option 2', value: 2 },
    { text: 'Option 3', value: 3 },
    { text: 'Option 4', value: 4 },
    { text: 'Option 5', value: 5 },
    { text: 'Option 6', value: 6 },
  ],
  label: 'Select an option',
  placeholder: 'Any option?',
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WSelect" group="Form">
    <Variant title="default">
      <WSelect v-model="state.value" :label="state.label" :options="state.options" :placeholder="state.placeholder" />
    </Variant>
    <Variant title="disabled">
      <WSelect v-model="state.value" :label="state.label" :options="state.options" :placeholder="state.placeholder" disabled />
    </Variant>
    <Variant title="bottom">
      <WSelect v-model="state.value" :label="state.label" :options="state.options" :placeholder="state.placeholder" />
    </Variant>
  </Story>
</template>
