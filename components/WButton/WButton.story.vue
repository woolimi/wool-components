<script setup>
import colors from 'tailwindcss/colors';
import { reactive } from 'vue';

import WButton from './WButton.vue';

const state = reactive({
  text: 'Click here',
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WButton" group="UI">
    <Variant title="default">
      <WButton>
        {{ state.text }}
      </WButton>
      <WButton>
        {{ state.text }}
      </WButton>
      <WButton>
        {{ state.text }}
      </WButton>
      <WButton>
        {{ state.text }}
      </WButton>
    </Variant>
    <Variant title="disabled">
      <WButton disabled>
        {{ state.text }}
      </WButton>
    </Variant>
    <Variant title="Custom color (rose 800)">
      <WButton :color="colors.rose[800]">
        {{ state.text }}
      </WButton>
      <WButton :color="colors.rose[800]" disabled>
        {{ state.text }}
      </WButton>
    </Variant>
    <Variant title="Custom color (lime 300)">
      <WButton :color="colors.lime[300]">
        {{ state.text }}
      </WButton>
      <WButton :color="colors.lime[300]" disabled>
        {{ state.text }}
      </WButton>
    </Variant>
    <Variant title="Custom color (sky 800)">
      <WButton :color="colors.sky[800]">
        {{ state.text }}
      </WButton>
      <WButton :color="colors.sky[800]" disabled>
        {{ state.text }}
      </WButton>
    </Variant>
    <template #controls>
      <HstText v-model="state.text" title="default slot" />
    </template>
  </Story>
</template>
