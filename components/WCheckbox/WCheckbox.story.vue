<script setup>
import { reactive } from 'vue';

import WCheckbox from './WCheckbox.vue';

const state = reactive({
  text: 'Are you a sheep?',
  modelValue: false,
  modelValue2: false,
  modelValue3: false,
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WCheckbox" group="Form">
    <Variant title="default">
      <WCheckbox v-model="state.modelValue" :text="state.text" />
    </Variant>
    <Variant title="with label">
      <WCheckbox v-model="state.modelValue2" :text="state.text" label="Confirmation" />
    </Variant>
    <Variant title="disabled">
      <WCheckbox v-model="state.modelValue3" :text="state.text" disabled />
    </Variant>
  </Story>
</template>
