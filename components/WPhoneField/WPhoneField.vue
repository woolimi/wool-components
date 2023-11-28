<script setup lang="ts">
import parsePhoneNumber, { CountryCode, getExampleNumber, PhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import { computed, onMounted, onUnmounted, PropType, ref, toRef, watch } from 'vue';

import WError from '@/components/WError';
import WInput from '@/components/WInput';
import WLabel from '@/components/WLabel';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';
import { InputType } from '@/types';

import CountrySelect from './CountrySelect.vue';

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  type: { type: String as PropType<InputType>, default: InputType.TEXT },
  disabled: { type: Boolean, default: false },
  defaultCountry: { type: String as PropType<CountryCode>, default: 'FR' },
  locale: { type: String, default: 'en' },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue', 'check:isValidNumber', 'blur']);
const id = useIds().get();
const { isPlaying, playMeh, deletePlaying } = useMeh({ disabled: toRef(props, 'disabled'), id });

onUnmounted(() => {
  deletePlaying();
});
const country = ref(props.defaultCountry || 'FR');

const parsed = ref<PhoneNumber>();
const phoneInput = ref('');
onMounted(() => {
  parsed.value = parsePhoneNumber(props.modelValue ?? '');
});
const placeholder = computed(
  () =>
    getExampleNumber(country.value, examples)?.formatInternational().split(' ').slice(1).join(' '),
);
const onInput = (e: InputEvent) => {
  if (props.disabled) return;
  const target = e.target as HTMLInputElement;

  phoneInput.value = target.value;
  parsed.value = parsePhoneNumber(phoneInput.value, country.value);
};
const onChangeCountry = (countryCode: CountryCode) => {
  country.value = countryCode;
  parsed.value = parsePhoneNumber(phoneInput.value, countryCode);
};

watch(parsed, (p) => {
  const isValid = p?.isValid();
  emit('update:modelValue', p?.number);
  emit('check:isValidNumber', !p || isValid);

  if (isValid) {
    phoneInput.value =
      p
        ?.formatInternational()
        .replace(`+${p?.countryCallingCode}`, '')
        .trim() ?? '';
  }
  country.value = p?.country || country.value;
});
</script>
<template>
  <div class="wc-base">
    <WLabel v-if="label" :for="id" :disabled="disabled">
      {{ label }}
    </WLabel>
    <div class="flex">
      <CountrySelect
        :disabled="disabled"
        :model-value="country"
        :meh="isPlaying"
        :locale="locale"
        @update:model-value="onChangeCountry"
      />
      <WInput
        v-bind="$attrs"
        :id="id"
        :value="phoneInput"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :type="InputType.TEL"
        hide-sheep
        @input="onInput"
        @click="playMeh"
        @blur="$emit('blur', $event)"
      />
    </div>
    <WError :error-message="errorMessage" />
  </div>
</template>
