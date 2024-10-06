<script setup lang="ts">
import { mdiCalendar } from '@mdi/js';
import { vOnClickOutside } from '@vueuse/components';
import { useVModel } from '@vueuse/core';
import { isValid as dateIsValid } from 'date-fns/fp';
import { computed, PropType, reactive, ref, watch } from 'vue';

import WDatePicker from '@/components/WDatePicker';
import WError from '@/components/WError';
import WIcon from '@/components/WIcon';
import WInput from '@/components/WInput';
import WLabel from '@/components/WLabel';
import { useDateTime } from '@/composables/useDateTime';
import { useDropdown } from '@/composables/useDropdown';
import { useIds } from '@/composables/useIds';

type DateInputField = 'day' | 'month' | 'year';
const props = defineProps({
  modelValue: {
    type: Date as PropType<Date | undefined | null>,
    default: undefined,
  },
  label: { type: String, default: '' },
  locale: { type: String, default: undefined },
  format: { type: String, default: undefined },
  min: { type: String, default: undefined },
  max: { type: String, default: undefined },
  placeholderDay: { type: String, default: 'DD' },
  placeholderMonth: { type: String, default: 'MM' },
  placeholderYear: { type: String, default: 'YYYY' },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
});
const id = useIds().get();
const { getLocalFormat } = useDateTime();
const emit = defineEmits(['update:modelValue', 'error']);
const vm = useVModel(props, 'modelValue', emit);
const onClickInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.select();
};
const rootEl = ref<typeof WInput>();
const datePickerEl = ref<HTMLElement>();
const inputEls = ref<HTMLInputElement[]>([]);
const active = ref(false);
const { isDirectionUpwards, dropdownBottom, dropdownLeft, dropdownTop } = useDropdown({
  rootEl: rootEl,
  dropdownEl: datePickerEl,
  show: active,
});

const _format = computed(() => getLocalFormat(props.locale || navigator.language));
const _delimiter = computed(() => _format.value.split(/[a-zA-Z]+/)[1]);
const dateInputs = reactive<{ day?: string; month?: string; year?: string }>({
  day: undefined,
  month: undefined,
  year: undefined,
});
const _inputs = computed<
  {
    value: string | undefined;
    placeholder: string;
    order: number;
    name: DateInputField;
  }[]
>(() => {
  return [
    {
      value: dateInputs.month,
      placeholder: props.placeholderMonth,
      order: _format.value.indexOf('M'),
      name: 'month' as DateInputField,
    },
    {
      value: dateInputs.day,
      placeholder: props.placeholderDay,
      order: _format.value.indexOf('d'),
      name: 'day' as DateInputField,
    },
    {
      value: dateInputs.year,
      placeholder: props.placeholderYear,
      order: _format.value.indexOf('y'),
      name: 'year' as DateInputField,
    },
  ].sort((a, b) => a.order - b.order);
});
const conditions = {
  day: (v: number, vs: string) => v <= 31 && v > 0 && vs.length === 2 && vs > '03',
  month: (v: number, vs: string) => v <= 12 && v > 0 && vs.length === 2 && vs > '01',
  year: (v: number, vs: string) => v >= 1000 && v <= 9999 && vs.length === 4,
};
const addZeroPadding = (decimal: number, num?: number) => {
  return num !== undefined ? String(num).padStart(decimal, '0') : '';
};

const onInputDate = (e: Event, name: DateInputField, idx: number) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value?.replace(/[^0-9]/, '');
  const _parsed = parseInt(target.value);
  const value = Number.isNaN(_parsed) ? undefined : _parsed;
  const valueStr = name !== 'year' ? addZeroPadding(2, value) : value?.toString() ?? '';

  dateInputs[name] = valueStr;

  if (idx !== 2 && value && valueStr && conditions[name](value, valueStr)) {
    inputEls.value[idx + 1].focus();
    inputEls.value[idx + 1].select();
  }

  if (
    !value ||
    !dateInputs.day ||
    !dateInputs.year ||
    !dateInputs.month ||
    (name === 'year' && !conditions.year(value, valueStr))
  ) {
    emit('update:modelValue', undefined);
    return;
  }
  const d = new Date(`${dateInputs.year}-${dateInputs.month}-${dateInputs.day}`);

  if (dateIsValid(d)) {
    emit(`error`, false);
    emit('update:modelValue', d);
  } else {
    emit(`error`, true);
    emit('update:modelValue', undefined);
  }
};

watch(
  () => props.modelValue,
  (_mv) => {
    if (!_mv) return;
    dateInputs.day = addZeroPadding(2, _mv.getDate());
    dateInputs.month = addZeroPadding(2, _mv.getMonth() + 1);
    dateInputs.year = _mv.getFullYear().toString();
  },
  { immediate: true },
);
</script>
<template>
  <div class="wc-base">
    <WLabel :for="id" :disabled="disabled">
      {{ label }}
    </WLabel>
    <WInput ref="rootEl" :min="min" :max="max" :disabled="disabled" :error="!!errorMessage">
      <template #default>
        <ul class="ml-6 grid w-full grid-cols-7">
          <li
            v-for="(inp, idx) in _inputs"
            :key="inp.name"
            :class="{ ['col-span-2']: inp.name !== 'year', ['col-span-3']: inp.name === 'year' }"
            class="flex"
          >
            <input
              :id="id"
              ref="inputEls"
              :disabled="disabled"
              :value="inp.value"
              :class="$style.dateInput"
              :placeholder="inp.placeholder"
              type="number"
              step="1"
              min="0"
              inputmode="numeric"
              @input="onInputDate($event, inp.name, idx)"
              @click="onClickInput"
            />
            <span v-if="idx !== _inputs.length - 1" class="px-2 py-3 font-extrabold">
              {{ _delimiter }}
            </span>
          </li>
        </ul>
      </template>
      <template #append>
        <button
          :disabled="disabled"
          class="rounded-[50%] p-1 focus:!border-none focus:outline-none focus:wc-focus disabled:cursor-not-allowed"
          arial-label="Open date picker"
          @click="active = true"
        >
          <WIcon :path="mdiCalendar" />
        </button>
      </template>
    </WInput>
    <WError :error-message="errorMessage" />
    <WDatePicker
      v-show="active"
      v-model="vm"
      ref="datePickerEl"
      :class="$style.datePicker"
      :locale="locale"
      class="wc-scrollbar"
      v-on-click-outside="() => (active = false)"
      @pick="active = false"
    />
  </div>
</template>
<style module>
.dateInput {
  @apply my-2 bg-gray-200 wc-rounded hover:bg-gray-200;

  width: 100%;
  text-align: center;

  /* Firefox */
  -moz-appearance: textfield;
  outline: none;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  &:disabled {
    @apply cursor-not-allowed;
  }
}
.datePicker {
  position: fixed;
  z-index: 1;
  bottom: v-bind('isDirectionUpwards ? dropdownBottom : dropdownTop');
  left: v-bind('dropdownLeft');

  min-width: 0;
}
</style>
