<script setup>
import { onUnmounted, ref } from 'vue';

import WSheep from '@/components/WSheep';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

const disabled = ref(false);
const id = useIds().get();
const { playMeh, isPlaying, deletePlaying } = useMeh({ disabled, id });

onUnmounted(() => {
  deletePlaying();
});
</script>
<template>
  <article
    class="wc-base mx-1 my-1 max-w-[300px] bg-white wc-text wc-border wc-rounded hover:wc-focus [&_.sheepButton]:hover:wc-focus"
  >
    <div class="[&>*]:rounded-t-[10px]">
      <slot name="head" />
    </div>

    <div class="relative mx-2 h-[1px]">
      <span
        class="sheepButton absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[50%] bg-white p-1 wc-border"
        @click="playMeh"
      >
        <WSheep :meh="isPlaying" />
      </span>
    </div>

    <div class="px-2 pb-4 pt-8">
      <slot name="body" />
    </div>
  </article>
</template>
