<script setup lang="ts">
import { computed, onUnmounted, PropType, Ref, ref } from 'vue';

import WSheep from '@/components/WSheep';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';
import { InputType } from '@/types';

const props = defineProps({
  label: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  type: { type: String as PropType<InputType>, default: InputType.TEXT },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: undefined },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  hideSheep: { type: Boolean, default: false },
  meh: { type: Boolean, default: false },
});
const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({
  disabled: computed(() => props.disabled || props.hideSheep),
  id,
});
const inputElement = ref<HTMLInputElement>();
const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'click:append', event: Event): void;
  (e: 'click:prepend', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'input', event: InputEvent): void;
}>();

const onClick = (e: Event) => {
  if (props.disabled) return;
  emit('click', e);
};
const onPrependClick = (e: Event) => {
  if (props.disabled) return;
  onClick(e);
  emit('click:prepend', e);
};
const onAppendClick = (e: Event) => {
  if (props.disabled) return;
  onClick(e);
  emit('click:append', e);
};
onUnmounted(() => {
  deletePlaying();
});
defineOptions({
  inheritAttrs: false,
});
defineExpose<{
  inputElement: Ref<HTMLInputElement | undefined>;
}>({ inputElement });
</script>
<template>
  <div
    :class="{ ['ml-1']: hideSheep, ['ml-[20px]']: !hideSheep }"
    class="wc-base relative my-1 mr-1"
    @click="playMeh"
  >
    <WSheep
      v-if="!hideSheep"
      :disabled="disabled"
      :meh="meh || isPlaying"
      class="absolute left-[-20px] top-[50%] -translate-y-1/2"
    />
    <div
      :class="{
        ['wc-error-border']: error || errorMessage,
        ['!cursor-not-allowed wc-disabled-text wc-disabled-bg wc-disabled-border']: disabled,
      }"
      class="flex cursor-pointer items-center justify-between wc-bg wc-text wc-border wc-rounded focus-within:wc-focus"
    >
      <span
        v-if="$slots.prepend"
        :class="{ ['cursor-not-allowed']: disabled }"
        class="ml-4 flex h-[30px] w-fit items-center justify-center p-1 text-[16px] [&_svg]:h-[25px] [&_svg]:w-[25px]"
        @click="onAppendClick"
      >
        <slot name="prepend" />
      </span>
      <slot name="default" />
      <input
        v-if="!$slots.default"
        :id="id"
        ref="inputElement"
        :class="{ ['!pr-1']: !!$slots.append, ['!pl-1']: !!$slots.prepend, ['!pl-3']: hideSheep }"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        class="w-full cursor-pointer bg-inherit py-3 pl-6 pr-3 outline-none wc-rounded disabled:cursor-not-allowed"
        @click="onClick"
        @input="emit('input', $event as InputEvent)"
        @blur="emit('blur', $event)"
      />

      <span
        v-if="$slots.append"
        :class="{ ['cursor-not-allowed']: disabled }"
        class="mx-1 flex w-fit items-center justify-center p-1 text-[16px] [&_svg]:h-[25px] [&_svg]:w-[25px]"
        @click="onPrependClick"
      >
        <slot name="append" />
      </span>
    </div>
  </div>
</template>
