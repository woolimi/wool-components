<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import { vOnClickOutside } from '@vueuse/components';
import { useElementBounding } from '@vueuse/core';
import colors from 'tailwindcss/colors';
import { ref } from 'vue';

import WButton from '@/components/WButton';
import WIcon from '@/components/WIcon';
defineProps({
  closeClickOutside: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: colors.sky[700],
  },
});
const active = ref(false);
const content = ref<HTMLElement>();
const { height: contentHeight } = useElementBounding(content);
</script>

<template>
  <div class="wc-base" v-on-click-outside="() => (closeClickOutside ? (active = false) : null)">
    <WButton
      :color="color"
      :class="{ ['py-4']: active }"
      class="w-[calc(100%-24px)] text-left transition-[padding] duration-500"
      @click="active = !active"
    >
      <div class="flex items-center justify-between gap-1">
        <slot name="title" />
        <WIcon
          :path="mdiPlus"
          :class="{ ['rotate-[45deg]']: active }"
          class="h-[24px] w-[24px] text-white transition-transform duration-500"
        />
      </div>
    </WButton>
    <div
      :style="{ maxHeight: active ? `${contentHeight}px` : '0px' }"
      class="m-1 ml-6 max-h-0 overflow-hidden transition-all duration-300"
    >
      <div ref="content" class="bg-white px-4 py-3 text-black wc-border wc-rounded">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>
