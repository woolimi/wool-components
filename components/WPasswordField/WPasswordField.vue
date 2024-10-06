<script setup lang="ts">
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { computed, ref } from 'vue';

import WIcon from '@/components/WIcon';
import WInput from '@/components/WInput';
import WLabel from '@/components/WLabel';
import { useIds } from '@/composables/useIds';
import { InputType } from '@/types';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue']);
const inputType = ref<InputType.TEXT | InputType.PASSWORD>(InputType.PASSWORD);
const id = useIds().get();
const active = ref(false);

const changeInputType = (type: InputType.TEXT | InputType.PASSWORD) => {
  if (props.disabled) return;

  inputType.value = type;
};
const onInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
const validators = [
  { text: 'At least 1 lowercase', type: 'Lowercase', valid: false, regex: /[a-z]/ },
  { text: 'At least 1 uppercase', type: 'Uppercase', valid: false, regex: /[A-Z]/ },
  { text: 'At least 1 digit', type: 'Number', valid: false, regex: /\d/ },
  { text: 'At least 1 special character', type: 'Special', valid: false, regex: /[^A-Za-z0-9]/ },
  { text: 'At least 8 characters', type: 'Length', valid: false, regex: /.{8,}/ },
];
const grade = computed(() => {
  const total = validators.filter((v) => props.modelValue.match(v.regex)).length;
  return total - 1;
});
</script>
<template>
  <div class="wc-base">
    <WLabel :for="id">
      {{ label }}
    </WLabel>
    <WInput
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :type="inputType"
      :placeholder="placeholder"
      @input="onInput"
      @focus="active = true"
      @blur="active = false"
    >
      <template #append>
        <WIcon
          v-if="inputType === InputType.PASSWORD"
          :path="mdiEyeOff"
          @click="changeInputType(InputType.TEXT)"
        />
        <WIcon v-else :path="mdiEye" @click="changeInputType(InputType.PASSWORD)" />
      </template>
    </WInput>

    <ul class="ml-6 mr-1 mt-2 flex flex-1 gap-[1px] overflow-hidden rounded-lg border-black">
      <li
        v-for="(_, idx) in validators"
        :key="idx"
        :class="{
          ['!bg-rose-300']: 0 === idx && grade === 0,
          ['!bg-rose-400']: 1 >= idx && grade === 1,
          ['!bg-orange-300']: 2 >= idx && grade === 2,
          ['!bg-lime-300']: 3 >= idx && grade === 3,
          ['!bg-sky-300']: 4 >= idx && grade === 4,
        }"
        class="h-2 flex-1 bg-transparent transition-colors"
      />
    </ul>
  </div>
</template>
