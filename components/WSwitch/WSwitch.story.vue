<script setup>
import { reactive } from 'vue';

import WSwitch from './WSwitch.vue';

const state = reactive({
  modelValue: false,
  disabled: false,
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WSwitch" group="UI">
    <Variant title="default">
      <WSwitch v-model="state.modelValue" :disabled="state.disabled" />
    </Variant>
    <Variant title="disabled">
      <WSwitch v-model="state.modelValue" disabled />
    </Variant>
  </Story>
</template>
