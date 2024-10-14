<script setup lang="ts">
import { mdiChevronDown, mdiChevronRight, mdiMenu } from '@mdi/js';
import { vOnClickOutside } from '@vueuse/components';
import { ref, watch } from 'vue';

import WIcon from '@/components/WIcon';
import WSheep from '@/components/WSheep';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

defineProps({
  model: {
    type: Array<{
      text: string;
      to: string;
      items:
        | undefined
        | Array<{
            text: string;
            to: string;
            items: undefined | Array<{ text: string; to: string }>;
          }>;
    }>,
    default: [],
  },
});
const active = ref(false);
const activeId = ref<number | undefined>();
const activeId2 = ref<number | undefined>();
const onInactive = () => {
  active.value = false;
  activeId.value = undefined;
  activeId2.value = undefined;
};
const onActive = (id: number, to?: string) => {
  if (to) return onInactive();
  active.value = true;

  if (activeId.value === id) activeId.value = undefined;
  else {
    activeId.value = id;
    activeId2.value = undefined;
  }
};
const onActiveId2 = (id: number) => {
  if (active.value) {
    activeId2.value = activeId2.value === id ? undefined : id;
  }
};
const onActiveId2Desktop = (id: number) => {
  if (active.value && window.innerWidth > 720) {
    activeId2.value = id;
  }
};
const { isPlaying, playMeh } = useMeh({ id: useIds().get() });
watch(active, () => {
  playMeh();
});
</script>
<template>
  <nav class="wc-base" v-on-click-outside="onInactive">
    <div class="flex items-center gap-3 bg-white p-2 shadow-lg -sm:relative -sm:justify-between">
      <slot name="logo">
        <a
          tabindex="0"
          aria-label="sheep logo"
          href="#"
          class="block rounded-[50%] !border-none transition-all focus:wc-focus"
        >
          <WSheep :meh="isPlaying" />
        </a>
      </slot>

      <button
        class="rounded-[50%] !border-none p-1 focus:wc-focus sm:hidden"
        @click="active = !active"
      >
        <WIcon :path="mdiMenu" class="h-[30px] w-[30px] text-black" />
      </button>

      <ul
        :class="{
          ['left-0 -sm:top-full -sm:!flex -sm:w-full -sm:border-t-black -sm:shadow-lg']: active,
        }"
        class="flex flex-wrap gap-2 bg-white p-1 -sm:absolute -sm:hidden -sm:flex-col"
      >
        <li v-for="(m, id) in model" :key="id" class="relative wc-text">
          <component
            :is="m.to ? 'a' : 'button'"
            :href="m.to"
            :class="{ ['!bg-sky-500 text-white']: activeId === id }"
            class="flex w-full cursor-pointer items-center gap-1 px-3 py-3 text-left transition-all wc-rounded hover:wc-disabled-bg focus:!border-none focus:wc-focus sm:justify-between sm:text-left"
            @click="onActive(id, m.to)"
          >
            {{ m.text }}
            <WIcon v-if="m.items" :path="mdiChevronDown" class="h-[16px] w-[16px]" />
          </component>

          <ul
            v-if="m.items"
            :class="[{ ['!flex']: activeId === id }]"
            class="absolute left-0 top-[calc(100%+8px)] hidden w-max flex-col gap-2 bg-white p-2 wc-shadow -sm:static -sm:my-1 -sm:w-full -sm:pl-6 -sm:pr-0 -sm:shadow-none"
          >
            <li
              v-for="(m2, id2) in m.items"
              :key="`m2-${id2}`"
              class="relative transition-all focus:wc-focus"
            >
              <component
                :is="m.to ? 'a' : 'button'"
                :href="m2.to"
                :class="{ ['!bg-sky-200 text-black']: activeId2 === id2 && m2.items }"
                class="flex w-full items-center justify-between gap-2 px-3 py-2 wc-rounded hover:wc-disabled-bg focus:!border-none focus:wc-focus"
                @click.stop="() => (m2.items?.length ? onActiveId2(id2) : onInactive())"
                @mouseover.self="onActiveId2Desktop(id2)"
              >
                {{ m2.text }}
                <WIcon
                  v-if="m2.items"
                  :path="mdiChevronRight"
                  class="h-[16px] w-[16px] -sm:hidden"
                />
                <WIcon v-if="m2.items" :path="mdiChevronDown" class="h-[16px] w-[16px] sm:hidden" />
              </component>
              <ul
                v-if="m2.items"
                :class="[{ ['!flex']: activeId2 === id2 && m2.items }]"
                class="absolute left-[calc(100%+9px)] top-0 hidden w-max flex-col gap-2 bg-white p-2 wc-shadow -sm:static -sm:left-0 -sm:top-full -sm:my-1 -sm:w-full -sm:pl-6 -sm:pr-0 -sm:shadow-none"
              >
                <li v-for="(m3, id3) in m2.items" :key="`m3-${id3}`">
                  <a
                    :href="m3.to"
                    class="flex w-full px-4 py-2 wc-rounded hover:wc-disabled-bg focus:!border-none focus:wc-focus"
                    @click.stop="onActive(id, m3.to)"
                  >
                    {{ m3.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
