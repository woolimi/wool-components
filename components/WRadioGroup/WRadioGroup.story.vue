<script setup>
import { reactive } from 'vue';

import WRadio from '@/components/WRadio';
import WRadioGroup from '@/components/WRadioGroup';

const state = reactive({
  modelValue: '',
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WRadioGroup" group="Form">
    <Variant title="default">
      <WRadioGroup v-model="state.modelValue" label="Gender" name="Gender">
        <WRadio value="male" text="Male" />
        <WRadio value="female" text="Female" />
      </WRadioGroup>
    </Variant>
    <Variant title="disabled">
      <WRadioGroup v-model="state.modelValue" disabled label="Gender" name="Gender">
        <WRadio value="male" text="Male" />
        <WRadio value="female" text="Female" />
      </WRadioGroup>
    </Variant>
  </Story>
</template>
