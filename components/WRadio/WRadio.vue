<script setup lang="ts">
import { onUnmounted, WritableComputedRef } from 'vue';
import { computed, inject, ref, toRef } from 'vue';

import WSheep from '@/components/WSheep';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  name: { type: String, default: '' },
  value: { type: [String, Number], required: true },
  text: { type: String, default: '' },
});
const radioGroupName = inject('radioGroupName', '');
const radioGroupModel = inject('radioGroupModel', undefined) as
  | undefined
  | WritableComputedRef<string | number>;
const radioGroupDisabled = inject('radioGroupDisabled', undefined) as
  | undefined
  | WritableComputedRef<boolean>;
const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });
const emit = defineEmits(['update:modelValue']);
const isDisabled = computed(() => props.disabled || radioGroupDisabled?.value);
const input = ref<HTMLInputElement>();
const onChange = () => {
  if (!isDisabled.value) {
    if (radioGroupName && radioGroupModel) {
      radioGroupModel.value = props.value;
    } else {
      emit('update:modelValue', props.value);
    }
    input.value?.focus();
    playMeh();
  }
};
const checked = computed(() =>
  radioGroupName && radioGroupModel
    ? radioGroupModel.value === props.value
    : props.modelValue === props.value,
);
onUnmounted(() => {
  deletePlaying();
});
</script>
<template>
  <div class="wc-base">
    <div
      :class="{
        ['wc-active-bg except-touch:hover:wc-active-hover-bg']: !isDisabled && checked,
        ['!cursor-not-allowed wc-disabled-text wc-disabled-bg wc-disabled-border except-touch:hover:wc-disabled-bg']:
          isDisabled,
      }"
      class="mx-1 my-1 flex cursor-pointer items-center gap-2 px-2 py-1 wc-bg wc-text wc-border wc-rounded focus-within:wc-focus except-touch:hover:wc-hover-bg"
      @click="onChange"
    >
      <WSheep :meh="isPlaying" :disabled="isDisabled" class="pointer-events-none" />
      <span v-if="text" class="pointer-events-none">
        {{ text }}
      </span>
      <input
        ref="input"
        v-bind="$attrs"
        :value="value"
        :name="radioGroupName || name"
        :disabled="isDisabled"
        type="radio"
        class="absolute h-0 w-0 opacity-0"
      />
    </div>
  </div>
</template>
