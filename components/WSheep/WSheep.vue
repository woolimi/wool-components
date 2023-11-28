<script setup lang="ts">
import Sheep from '@/assets/sheep.svg';
import SheepMeh from '@/assets/sheep-meh.svg';
import SheepSleep from '@/assets/sheep-sleep.svg';

defineProps({
  meh: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <SheepSleep v-if="disabled" v-bind="$attrs" class="h-[40px] w-[40px] wc-disabled-path" />
  <Sheep v-else-if="!meh" v-bind="$attrs" class="h-[40px] w-[40px]" />
  <SheepMeh v-else v-bind="$attrs" class="h-[40px] w-[40px]" />
</template>
