<script setup>
import { reactive } from 'vue';

import WTextarea from './WTextarea.vue';

const state = reactive({
  modelValue: undefined,
  label: 'Write something',
  placeholder: 'Some text here...',
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WTextarea" group="Form">
    <Variant title="default">
      <WTextarea
        v-model="state.value"
        :label="state.label"
        :options="state.options"
        :placeholder="state.placeholder"
      />
    </Variant>
    <Variant title="disabled">
      <WTextarea
        v-model="state.value"
        :label="state.label"
        :options="state.options"
        :placeholder="state.placeholder"
        disabled
      />
    </Variant>
  </Story>
</template>
