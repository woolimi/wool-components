<script setup>
import { mdiPlus } from '@mdi/js';

import WIcon from './WIcon.vue';
</script>
<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WIcon">
    <Variant title="default">
      <WIcon
        :path="mdiPlus"
        class="text-primary h-[36px] w-[36px] shrink-0 transition-transform duration-300"
      />
    </Variant>
  </Story>
</template>
