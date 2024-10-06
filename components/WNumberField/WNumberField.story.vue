<script setup>
import { mdiCurrencyEur } from '@mdi/js';

import { WNumberField } from '@/components';
import WIcon from '@/components/WIcon';

const initState = () => ({
  label: 'Number',
  value: undefined,
  locale: 'en',
});
</script>

<template>
  <Story
    :layout="{ type: 'grid', width: '95%' }"
    :init-state="initState"
    title="WNumberField"
    group="Form"
  >
    <Variant title="default">
      <template #default="{ state }">
        <WNumberField
          v-model="state.value"
          :label="state.label"
          :placeholder="Intl.NumberFormat(state.locale).format('1234567.89')"
          :locale="state.locale"
        />
      </template>
    </Variant>

    <Variant title="locale = fr, maximum fraction = 2">
      <template #default="{ state }">
        <WNumberField
          v-model="state.value"
          :maximum-fraction-digits="2"
          :placeholder="Intl.NumberFormat('fr').format('12.34')"
          label="French locale number format"
          locale="fr"
        >
          <template #append>
            <WIcon :path="mdiCurrencyEur" />
          </template>
        </WNumberField>
      </template>
    </Variant>

    <Variant title="disabled">
      <template #default="{ state }">
        <WNumberField
          v-model="state.value"
          :label="state.label"
          :placeholder="state.placeholder"
          disabled
        />
      </template>
    </Variant>
  </Story>
</template>
