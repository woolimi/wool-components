<script setup>
import WError from '@/components/WError';
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WError" group="Form">
    <Variant title="one item">
      <WError error-message="Some error message" />
    </Variant>
  </Story>
</template>
