<script setup lang="ts">
import { mdiCurrencyEur } from '@mdi/js';
import { reactive } from 'vue';

import WIcon from '@/components/WIcon';
import { InputType } from '@/types';

import WInput from './WInput.vue';

const state = reactive({
  type: InputType.TEXT,
  value: '',
  label: 'What are you looking for?',
});
const onInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  state.value = target?.value;
};
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WInput" group="Form">
    <Variant title="default">
      <WInput :value="state.value" :type="state.type" placeholder="Type here..." @input="onInput" />
    </Variant>
    <Variant title="hide sheep">
      <WInput
        :value="state.value"
        :type="state.type"
        hide-sheep
        placeholder="Type here..."
        @input="onInput"
      />
    </Variant>
    <Variant title="error">
      <WInput
        :value="state.value"
        :type="state.type"
        error
        placeholder="Type here..."
        @input="onInput"
      />
    </Variant>
    <Variant title="disabled">
      <WInput
        :value="state.value"
        :type="state.type"
        disabled
        placeholder="Type here..."
        @input="onInput"
      />
    </Variant>
    <Variant title="prepend icon">
      <WInput :value="state.value" :type="state.type" placeholder="Type here..." @input="onInput">
        <template #prepend>
          <CurrencyEuroIcon />
        </template>
      </WInput>
    </Variant>
    <Variant title="append icon">
      <WInput :value="state.value" :type="state.type" placeholder="Type here..." @input="onInput">
        <template #append>
          <CurrencyEuroIcon />
        </template>
      </WInput>
    </Variant>
    <Variant title="prepend text">
      <WInput :value="state.value" :type="state.type" placeholder="Type here..." @input="onInput">
        <template #prepend> € </template>
      </WInput>
    </Variant>
    <Variant title="append text">
      <WInput :value="state.value" :type="state.type" placeholder="Type here..." @input="onInput">
        <template #append> € </template>
      </WInput>
    </Variant>
    <Variant title="disabled with icon">
      <WInput
        :value="state.value"
        :type="state.type"
        disabled
        placeholder="Type here..."
        @input="onInput"
      >
        <template #append>
          <WIcon :path="mdiCurrencyEur" />
        </template>
      </WInput>
    </Variant>
  </Story>
</template>
