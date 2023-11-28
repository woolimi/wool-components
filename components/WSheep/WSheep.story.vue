<script setup>
import WSheep from './WSheep.vue';
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }" title="WSheep" group="UI">
    <Variant title="default">
      <WSheep />
    </Variant>
    <Variant title="meh">
      <WSheep :meh="true" />
    </Variant>
    <Variant title="disabled">
      <WSheep disabled />
    </Variant>
  </Story>
</template>
