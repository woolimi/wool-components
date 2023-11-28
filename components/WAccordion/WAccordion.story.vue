<script setup>
import colors from 'tailwindcss/colors';

import WAccordion from './WAccordion.vue';
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WAccordion" group="UI">
    <Variant title="default">
      <WAccordion>
        <template #title> Sheep are usually bred for wool </template>
        <template #default>
          Sheep are very gentle animals and were one of the first animals to be domesticated. They can differentiate facial expressions, and prefer a
          smile to a frown.
        </template>
      </WAccordion>
      <WAccordion>
        <template #title> Sheep have no upper teeth </template>
        <template #default>
          Sheep can't grow teeth in the upper front portions of their jaws, instead of leaving their lower teeth to fill in the gap. Useful when
          chewing, of course!
        </template>
      </WAccordion>
    </Variant>
    <Variant title="close outside click">
      <WAccordion close-click-outside>
        <template #title> Sheep are usually bred for wool </template>
        <template #default>
          Sheep are very gentle animals and were one of the first animals to be domesticated. They can differentiate facial expressions, and prefer a
          smile to a frown.
        </template>
      </WAccordion>
      <WAccordion close-click-outside>
        <template #title> Sheep have no upper teeth </template>
        <template #default>
          Sheep can't grow teeth in the upper front portions of their jaws, instead of leaving their lower teeth to fill in the gap. Useful when
          chewing, of course!
        </template>
      </WAccordion>
    </Variant>
    <Variant title="color">
      <WAccordion :color="colors.emerald[700]" close-click-outside>
        <template #title> Sheep are usually bred for wool </template>
        <template #default>
          Sheep are very gentle animals and were one of the first animals to be domesticated. They can differentiate facial expressions, and prefer a
          smile to a frown.
        </template>
      </WAccordion>
      <WAccordion :color="colors.red[600]" close-click-outside>
        <template #title> Sheep have no upper teeth </template>
        <template #default>
          Sheep can't grow teeth in the upper front portions of their jaws, instead of leaving their lower teeth to fill in the gap. Useful when
          chewing, of course!
        </template>
      </WAccordion>
    </Variant>
  </Story>
</template>
