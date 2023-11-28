<script setup>
import { addDays, addMonths, addYears } from 'date-fns/fp';

import WDatePicker from './WDatePicker.vue';
const initState = () => {
  return {
    value: undefined,
    max: new Date(),
    min: undefined,
  };
};
const min1 = addDays(-10, new Date());
const min2 = addMonths(-2, new Date());
const min3 = addYears(-30, new Date());
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WDatePicker" group="Form">
    <Variant :init-state="initState" title="default">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDatePicker v-model="state.value" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="locale = ko">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDatePicker v-model="state.value" locale="ko" />
      </template>
    </Variant>
    <Variant :title="`min = ${min1.toLocaleDateString()}, max = today`" :init-state="initState">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDatePicker v-model="state.value" :max="new Date()" :min="min1" />
      </template>
    </Variant>
    <Variant :title="`min = ${min2.toLocaleDateString()}, max = today`" :init-state="initState">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDatePicker v-model="state.value" :max="new Date()" :min="min2" />
      </template>
    </Variant>
    <Variant :title="`min = ${min3.toLocaleDateString()}, max = today`" :init-state="initState">
      <template #default="{ state }">
        <p class="min-h-[48px]">modelValue: {{ state.value }}</p>
        <WDatePicker v-model="state.value" :max="new Date()" :min="min3" />
      </template>
    </Variant>
  </Story>
</template>
