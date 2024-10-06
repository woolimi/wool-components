<script setup lang="ts">
import { pipe } from '@fxts/core';
import { mdiChevronDown, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useMediaQuery } from '@vueuse/core';
import {
  addMonths,
  endOfMonth,
  isAfter,
  isBefore,
  max as maxDate,
  min as minDate,
  setMonth,
  setYear,
  startOfDay,
  startOfMonth,
} from 'date-fns/fp';
import { computed, PropType, ref, watch } from 'vue';

import WIcon from '@/components/WIcon';
import { useDateTime } from '@/composables/useDateTime';

import MonthPicker from './MonthPicker.vue';
import YearPicker from './YearPicker.vue';

const props = defineProps({
  modelValue: {
    type: [Date, null, undefined] as PropType<Date | null | undefined>,
    default: undefined,
  },
  label: { type: String, default: '' },
  format: { type: String, default: 'dd/MM/yyyy' },
  locale: { type: String, default: 'en' },
  min: { type: Date, default: undefined },
  max: { type: Date, default: undefined },
});
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: Date): void;
  (e: 'pick'): void;
}>();
const _min = computed(() => (props.min ? startOfDay(props.min) : undefined));
const _max = computed(() => (props.max ? startOfDay(props.max) : undefined));
const getDefaultDate = (initialDate: Date | undefined | null) => {
  let res = startOfDay(initialDate || new Date());
  if (_min.value) {
    res = maxDate([_min.value, res]);
  }
  if (_max.value) {
    res = minDate([_max.value, res]);
  }
  return res;
};

const showPicker = ref<'month' | 'year' | false>(false);
const { constructUTC, formatDate } = useDateTime();
const isSmallScreen = useMediaQuery('(max-width: 320px)');
const weekDays = computed(() => {
  const justMonday = constructUTC(2017, 0, 2);
  const arr: string[] = [];
  for (let i = 0; i < 7; i++) {
    arr.push(justMonday.toLocaleDateString(props.locale, { weekday: 'short' }).replace('.', ''));
    justMonday.setDate(justMonday.getDate() + 1);
  }
  if (isSmallScreen.value) {
    return arr.map((d) => d[0]);
  }
  return arr;
});

const firstDayOfMonth = computed(() => startOfMonth(currentlyViewed.value));
const lastDayOfMonth = computed(() => endOfMonth(currentlyViewed.value));
const lastDayOfPrevMonth = computed(() => pipe(currentlyViewed.value, addMonths(-1), endOfMonth));
const firstDayOfNextMonth = computed(() => pipe(currentlyViewed.value, addMonths(1), startOfMonth));
const currentlyViewed = ref<Date>(getDefaultDate(props.modelValue));
const currentlyViewedMonthDates = computed(() =>
  Array.from(Array(lastDayOfMonth.value.getDate())).map((_, i) => i + 1),
);
const currentlyViewedYear = computed(() => currentlyViewed.value.getFullYear());
const currentlyViewedMonth = computed(() => currentlyViewed.value.getMonth());
const pickedDayIsInCurrentMonth = computed(
  () =>
    props.modelValue?.getFullYear() === currentlyViewed.value.getFullYear() &&
    props.modelValue?.getMonth() === currentlyViewed.value.getMonth(),
);
const pickedDayDate = computed(() => props.modelValue?.getDate());
const visibleFromPrevMonth = computed(() => {
  const firstDay = firstDayOfMonth.value.getDay();
  const res: number[] = [];

  if (firstDay === 1) {
    return res;
  }
  const daysToAdd = (firstDay + 6) % 7; // getDay returns 0 – Sunday to 6 – Saturday
  const _lastDayOfPrevMonth = lastDayOfPrevMonth.value.getDate();
  for (let i = _lastDayOfPrevMonth; i > _lastDayOfPrevMonth - daysToAdd; i--) {
    res.unshift(i);
  }
  return res;
});
const visibleFromNextMonth = computed(() => {
  const lastDay = lastDayOfMonth.value.getDay();
  const res: number[] = [];

  if (lastDay === 0) {
    return res;
  }
  for (let i = 1; i <= 7 - lastDay; i++) {
    res.push(i);
  }
  return res;
});
const changeMonth = (direction: -1 | 1) => {
  currentlyViewed.value = addMonths(direction, currentlyViewed.value);
};

const pickDate = (date: number) => {
  emit(
    'update:modelValue',
    pipe(
      new Date(currentlyViewed.value.getFullYear(), currentlyViewed.value.getMonth(), date),
      startOfDay,
    ),
  );
  emit('pick');
};
watch(
  () => props.modelValue,
  (mv) => {
    if (!mv) return;
    currentlyViewed.value = getDefaultDate(props.modelValue);
  },
  { immediate: true },
);
</script>
<template>
  <div class="wc-base">
    <div class="m-1 max-w-[320px] bg-white px-2 py-3 text-black wc-rounded wc-shadow">
      <header class="mb-2 flex items-center justify-around border-b-[1px] border-gray-300 pb-2">
        <button
          :disabled="_min && pipe(lastDayOfPrevMonth, isBefore(_min))"
          class="rounded-[50%] p-2 hover:bg-gray-100 disabled:bg-inherit disabled:text-gray-300"
          @click="changeMonth(-1)"
        >
          <WIcon :path="mdiChevronLeft" class="h-[24px] w-[24px]" />
        </button>
        <div class="flex items-center gap-2">
          <button
            :class="{ ['bg-gray-200']: showPicker === 'month' }"
            class="rounded-[14px] px-3 py-2 font-bold hover:bg-gray-100"
            @click="showPicker === 'month' ? (showPicker = false) : (showPicker = 'month')"
          >
            {{ formatDate(currentlyViewed, locale) }}
          </button>
          <button
            :class="{ ['bg-gray-200']: showPicker === 'year' }"
            class="rounded-[50%] p-2 hover:bg-gray-100"
            @click="showPicker === 'year' ? (showPicker = false) : (showPicker = 'year')"
          >
            <WIcon
              :path="mdiChevronDown"
              :class="{ ['rotate-180']: showPicker === 'year' }"
              class="h-[20px] w-[20px] transition-transform"
            />
          </button>
        </div>
        <button
          :disabled="_max && pipe(firstDayOfNextMonth, isAfter(_max))"
          class="rounded-[50%] p-2 hover:bg-gray-100 disabled:bg-inherit disabled:text-gray-300"
          @click="changeMonth(1)"
        >
          <WIcon :path="mdiChevronRight" class="h-[24px] w-[24px]" />
        </button>
      </header>

      <!-- Picker -->
      <Transition name="fade">
        <MonthPicker
          v-if="showPicker === 'month'"
          :model-value="currentlyViewedMonth"
          :locale="locale"
          :min="currentlyViewedYear === _min?.getFullYear() ? _min?.getMonth() : undefined"
          :max="currentlyViewedYear === _max?.getFullYear() ? _max?.getMonth() : undefined"
          @update:model-value="(m) => (currentlyViewed = setMonth(m, currentlyViewed))"
          @close="showPicker = false"
        />
        <YearPicker
          v-else-if="showPicker === 'year'"
          :model-value="currentlyViewedYear"
          :min="_min?.getFullYear()"
          :max="_max?.getFullYear()"
          @update:model-value="(y) => (currentlyViewed = setYear(y, currentlyViewed))"
          @close="showPicker = false"
        />
        <div v-else>
          <ul class="mt-3 grid grid-cols-7 gap-1 text-center font-semibold text-black">
            <li v-for="day in weekDays" :key="day" class="flex justify-center">
              <span class="block h-[34px] w-[34px] text-[14px] uppercase">
                {{ day }}
              </span>
            </li>
          </ul>
          <ul class="grid grid-cols-7 gap-1 text-center">
            <li v-for="date in visibleFromPrevMonth" :key="`p-${date}`">
              <button disabled class="h-[34px] w-[34px] p-1 text-gray-300">
                {{ date }}
              </button>
            </li>
            <li
              v-for="date in currentlyViewedMonthDates"
              :key="date"
              class="flex items-center justify-center"
            >
              <button
                :class="{
                  ['text-white wc-active-bg hover:wc-active-hover-bg']:
                    pickedDayIsInCurrentMonth && pickedDayDate === date,
                }"
                :disabled="
                  (_min &&
                    pipe(
                      new Date(currentlyViewedYear, currentlyViewedMonth, date),
                      startOfDay,
                      isBefore(_min),
                    )) ||
                  (_max &&
                    pipe(
                      new Date(currentlyViewedYear, currentlyViewedMonth, date),
                      startOfDay,
                      isAfter(_max),
                    ))
                "
                class="h-[34px] w-[34px] rounded-[50%] p-1 hover:wc-hover-bg disabled:bg-transparent disabled:text-gray-300 hover:disabled:bg-transparent"
                @click="pickDate(date)"
              >
                {{ date }}
              </button>
            </li>
            <li
              v-for="date in visibleFromNextMonth"
              :key="`n-${date}`"
              class="flex items-center justify-center"
            >
              <button disabled class="h-[34px] w-[34px] p-1 text-gray-300">
                {{ date }}
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-leave-from,
.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
