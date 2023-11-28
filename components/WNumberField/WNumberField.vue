<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import { WInput, WLabel } from '@/components';
import { useIds } from '@/composables/useIds';
import { InputType } from '@/types';

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: Number, default: undefined },
  text: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: undefined },
  locale: { type: String, default: undefined },
  minimumIntegerDigits: { type: Number, default: 1 },
  maximumIntegerDigits: { type: Number, default: 10 },
  maximumFractionDigits: { type: Number, default: 3 },
});

const id = useIds().get();
const emit = defineEmits(['update:modelValue']);
const _formatter = computed(() =>
  Intl.NumberFormat(props.locale || navigator.language, {
    minimumIntegerDigits: props.minimumIntegerDigits,
    maximumFractionDigits: props.maximumFractionDigits,
    roundingMode: 'floor',
  } as Intl.NumberFormatOptions),
);
const _thousandsSeparator = computed(() => _formatter.value.format(1000).toString()[1]);
const _decimalSeparator = computed(() => _formatter.value.format(1.23).toString()[1]);
const _modelValue = ref(props.modelValue ? _formatter.value.format(props.modelValue) || '' : '');

const normalizeNumberString = (inputString: string) => {
  inputString = inputString.trim();
  // Construct the regular expression pattern
  const dSeparator = _decimalSeparator.value;
  const pattern = new RegExp(`^\\d*((${dSeparator}\\d+)|${dSeparator}){0,1}$`);

  // Remove characters that do not match the pattern
  const normalizedString = inputString.replace(new RegExp(`[^0-9$${dSeparator}]`, 'g'), '');

  // Check if the normalized string matches the pattern
  const matched = normalizedString.match(pattern)?.[0];
  return matched || '';
};

const onKeypress = (e: KeyboardEvent) => {
  if (
    !['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', _decimalSeparator.value].includes(e.key)
  ) {
    e.preventDefault();
    return;
  }
  const input = e.target as HTMLInputElement;
  const value = input.value;
  // Preventing the user from typing more than one decimal separator
  if (e.key === _decimalSeparator.value && value?.includes(_decimalSeparator.value)) {
    e.preventDefault();
  }

  const cursorPosition = input.selectionStart || 0;
  const splitted = value?.split(_decimalSeparator.value);
  const decimalPosition = value?.indexOf(_decimalSeparator.value);
  const partInteger = splitted?.[0];
  const partIntegerTrimmed = partInteger.replace(new RegExp(_thousandsSeparator.value, 'g'), '');
  const partFraction = splitted?.[1];

  if (
    partFraction &&
    partFraction.length === props.maximumFractionDigits &&
    cursorPosition >= decimalPosition
  ) {
    e.preventDefault();
    return;
  }

  if (e.key === _decimalSeparator.value) return;

  if (partFraction === undefined) {
    if (partIntegerTrimmed.length >= props.maximumIntegerDigits) {
      e.preventDefault();
    }
  } else {
    if (
      partIntegerTrimmed.length >= props.maximumIntegerDigits &&
      cursorPosition < decimalPosition
    ) {
      e.preventDefault();
    }
  }
};

const onInput = async (e: InputEvent) => {
  const input = e.target as HTMLInputElement;
  const initialCursor = input.selectionStart || 0;
  const initialLength = input.value?.length || 0;

  // Letting the user type separators.
  if (
    [_thousandsSeparator.value, _decimalSeparator.value].includes(e.data as string) &&
    initialCursor === input.value?.length
  ) {
    return;
  }
  const target = e.target as HTMLInputElement;
  target.value = normalizeNumberString(target.value || '');
  let value = target.value;

  value = value
    .replace(new RegExp(_thousandsSeparator.value, 'g'), '')
    .replace(_decimalSeparator.value, '.');

  const parsed = value ? parseFloat(value) : undefined;

  if (parsed !== props.modelValue) {
    emit('update:modelValue', parsed);
  } else {
    target.value = parsed ? _formatter.value.format(parsed) || '' : '';
  }
  await nextTick();
  const finalLength = target.value?.length;
  const finalCursor = initialCursor + (finalLength - initialLength);
  input.setSelectionRange(finalCursor, finalCursor);
};

const isMoreThanCertainDigits = (num: number | undefined, digits: number) => {
  if (!num) return false;
  return Math.floor(Math.log10(Math.abs(num))) + 1 > digits;
};
const isMoreThanCertainFractions = (number: number | undefined, fractions: number) => {
  if (!number) return;
  const decimalPlaces = (number.toString().split('.')[1] || '').length;
  return decimalPlaces > fractions;
};

watch(
  () => props.modelValue,
  (mv) => {
    if (
      isMoreThanCertainDigits(mv, props.maximumIntegerDigits) ||
      isMoreThanCertainFractions(mv, props.maximumFractionDigits)
    ) {
      emit('update:modelValue', undefined);
      return;
    }

    _modelValue.value = mv ? _formatter.value.format(mv) || '' : '';
  },
);
</script>
<template>
  <div>
    <WLabel v-if="label" :for="id" :disabled="disabled" class="wc-base">
      {{ label }}
    </WLabel>
    <WInput
      :id="id"
      :value="_modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="InputType.TEXT"
      inputmode="decimal"
      @input="onInput"
      @keypress="onKeypress"
    >
      <template #append>
        <slot name="append" />
      </template>
    </WInput>
  </div>
</template>
