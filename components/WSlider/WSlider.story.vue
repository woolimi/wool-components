<script setup lang="ts">
import WSlider from './WSlider.vue';

const initState = () => {
  return {
    value: 300,
    steps: [
      { value: 100, label: '100' },
      { value: 200, label: '200' },
      { value: 300, label: '300' },
      { value: 400, label: '400' },
      { value: 500, label: '500' },
    ],
  };
};
const formatter = new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' });
const tooltipFormatter = (value: number) => formatter.format(value);
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WSlider" group="UI">
    <Variant :init-state="initState" title="default">
      <template #default="{ state }">
        <WSlider v-model="state.value" :steps="state.steps" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="tooltip hover">
      <template #default="{ state }">
        <WSlider v-model="state.value" :steps="state.steps" tooltip="hover" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="tooltip formatter">
      <template #default="{ state }">
        <WSlider v-model="state.value" :steps="state.steps" :tooltip-formatter="tooltipFormatter" />
      </template>
    </Variant>
    <Variant :init-state="initState" title="disabled">
      <template #default="{ state }">
        <WSlider v-model="state.value" :steps="state.steps" disabled />
      </template>
    </Variant>
  </Story>
</template>
