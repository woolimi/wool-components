<script setup>
import WLabel from './WLabel.vue';
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WLabel" group="Form">
    <Variant title="default">
      <WLabel for="label"> Label </WLabel>
    </Variant>
    <Variant title="disabled">
      <WLabel disabled for="label"> Label </WLabel>
    </Variant>
  </Story>
</template>
