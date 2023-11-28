<script setup>
import '@/assets/flags.scss';

import { useDebounceFn } from '@vueuse/core';
import { reactive } from 'vue';

import WPhoneField from './WPhoneField.vue';

const state = reactive({
  label: 'Phone',
  value: '',
  locale: 'en',
  errorMessage: '',
});
const onCheck = useDebounceFn((valid) => {
  state.errorMessage = valid ? '' : 'Invalid phone number';
}, 1000);

const source = `
<script setup>
import { useDebounceFn } from "@vueuse/core";
import { ref } from "vue";
import "wool-components/dist/flags.css";

const errorMessage = ref("")
const onCheck = useDebounceFn((valid) => {
  errorMessage.value = valid ? "" : "Invalid phone number";
}, 1000);
<script>

<template>
  <WPhoneField
    v-model="phone"
    :label="label"
    :error="!!errorMessage"
    :error-message="state.errorMessage"
    @check:is-valid-number="onCheck"
  />
</template>
`;
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WPhoneField" group="Form">
    <Variant title="default">
      <WPhoneField v-model="state.value" :label="state.label" />
    </Variant>
    <Variant title="default country KR">
      <WPhoneField v-model="state.value" :label="state.label" default-country="KR" />
    </Variant>
    <Variant title="locale = fr">
      <WPhoneField v-model="state.value" :label="state.label" locale="fr" />
    </Variant>
    <Variant :source="source" title="error handling">
      <WPhoneField
        v-model="state.value"
        :label="state.label"
        :error="!!state.errorMessage"
        :error-message="state.errorMessage"
        @check:is-valid-number="onCheck"
      />
    </Variant>
    <Variant title="disabled">
      <WPhoneField v-model="state.value" :label="state.label" disabled />
    </Variant>
  </Story>
</template>

<docs lang="md">
# How to import

```js
import { WPhoneField } from "vue";
import "wool-components/dist/flags.css";

<template>
  <WPhoneField v-model="value" />
<template>
```
</docs>
