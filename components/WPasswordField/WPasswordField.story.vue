<script setup>
import WPasswordField from './WPasswordField.vue';

const initState = () => ({
  label: 'Password',
  value: '',
  placeholder: 'Enter password',
});
</script>

<template>
  <Story
    :layout="{ type: 'grid', width: '95%' }"
    :init-state="initState"
    title="WPasswordField"
    group="Form"
  >
    <Variant title="default">
      <template #default="{ state }">
        <WPasswordField
          v-model="state.value"
          :label="state.label"
          :placeholder="state.placeholder"
        />
      </template>
    </Variant>

    <Variant title="disabled">
      <template #default="{ state }">
        <WPasswordField
          v-model="state.value"
          :label="state.label"
          :placeholder="state.placeholder"
          disabled
        />
      </template>
    </Variant>
  </Story>
</template>
