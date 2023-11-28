<script lang="ts" setup>
import { shouldPolyfill as shouldPolyfillDisplayNames } from '@formatjs/intl-displaynames/should-polyfill';
import { shouldPolyfill } from '@formatjs/intl-getcanonicallocales/should-polyfill';
import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside } from '@vueuse/components';
import { CountryCode } from 'libphonenumber-js';
import { computed, nextTick, onMounted, PropType, ref, toRef, watch } from 'vue';

import WInput from '@/components/WInput';
import { useDropdown } from '@/composables/useDropdown';
import { useIds } from '@/composables/useIds';
import { useMeh } from '@/composables/useMeh';

import countries from './countries';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: { type: String as PropType<CountryCode>, default: 'FR' },
  disabled: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  locale: { type: String, default: 'en' },
  meh: { type: Boolean, default: false },
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: CountryCode): void;
}>();

const input = ref<typeof WInput>();
const dropdown = ref<HTMLInputElement>();
const optionElements = ref<Array<HTMLDivElement>>([]);
const active = ref(false);
const { isDirectionUpwards, dropdownBottom, dropdownLeft, dropdownTop } = useDropdown({
  rootEl: input,
  dropdownEl: dropdown,
  show: active,
});
const { isPlaying, playMeh } = useMeh({ disabled: toRef(props, 'disabled'), id: useIds().get() });
const countryNameConverter = computed(() => {
  try {
    return new Intl.DisplayNames([props.locale?.split('-')[0].toLowerCase()], { type: 'region' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return new Intl.DisplayNames(['en'], { type: 'region' });
  }
});

const options = countries
  .map((c) => ({
    text: countryNameConverter.value?.of(c.iso2.toUpperCase()) ?? '',
    value: c.iso2,
    dialCode: c.dialCode,
  }))
  .sort((a, b) => (a.text < b.text ? -1 : 1));

const currentIndex = computed({
  get() {
    return options.findIndex((op) => op.value === props.modelValue);
  },
  set(index) {
    emit('update:modelValue', options[index].value);
  },
});

const currentDialCode = computed(
  () => options.find((op) => op.value === props.modelValue)?.dialCode ?? '',
);
const selectedValue = computed(() => (currentDialCode.value ? `+${currentDialCode.value}` : ''));
const onClickSelect = (value: CountryCode) => {
  if (props.disabled) return;
  emit('update:modelValue', value);
  active.value = false;
};
const onMoveSelect = (index: number) => {
  if (props.disabled) return;
  if (index < 0 || index >= options.length) return;

  currentIndex.value = index;
  optionElements.value[index]?.scrollIntoView({ block: 'nearest' });
  active.value = true;
};

const onToggle = () => {
  if (props.disabled) return;

  input.value?.$el.querySelector('button')?.focus();
  active.value = !active.value;
};

const onKeyDown = (event: KeyboardEvent) => {
  const ENTER_KEY_CODE = 'Enter';
  const ESCAPE_KEY_CODE = 'Escape';
  const SPACE_KEY_CODE = 'Space';
  const UP_KEY_CODE = 'ArrowUp';
  const DOWN_KEY_CODE = 'ArrowDown';

  switch (event.code) {
    case SPACE_KEY_CODE:
    case ENTER_KEY_CODE:
      event.preventDefault();
      active.value = !active.value;
      break;

    case ESCAPE_KEY_CODE:
      active.value = false;
      break;

    case DOWN_KEY_CODE:
      event.preventDefault();
      onMoveSelect(currentIndex.value + 1);
      break;

    case UP_KEY_CODE:
      event.preventDefault();
      onMoveSelect(currentIndex.value - 1);
      break;
  }

  const key = event.key.toLowerCase();

  if (key.length !== 1) return;
  const isLetter = key >= 'a' && key <= 'z';
  const isNumber = key >= '0' && key <= '9';
  if (!isLetter && !isNumber) return;

  const newIndex = options.findIndex((op) => String(op.text).toLowerCase().startsWith(key));
  if (newIndex > -1) {
    optionElements.value[newIndex]?.scrollIntoView({ block: 'start' });
  }
};
watch(active, (value) => {
  if (value) {
    nextTick(() => {
      optionElements.value[Math.max(currentIndex.value, 0)]?.scrollIntoView?.({
        block: 'start',
      });
    });
  }
});

onMounted(async () => {
  if (shouldPolyfill()) {
    await import('@formatjs/intl-getcanonicallocales/polyfill');
  }
  if (shouldPolyfillLocale()) {
    await import('@formatjs/intl-locale/polyfill');
  }
  if (shouldPolyfillDisplayNames('en')) {
    await import('@formatjs/intl-displaynames/polyfill-force');
    await import('@formatjs/intl-displaynames/locale-data/en');
  }
});
</script>

<template>
  <div :class="{ ['cursor-not-allowed']: disabled }" v-on-click-outside="() => (active = false)">
    <div class="w-fit" @click="onToggle" @keydown.stop="onKeyDown">
      <WInput ref="input" :disabled="disabled" :meh="isPlaying || meh" readonly>
        <template #prepend>
          <i
            :class="[`iti__${modelValue.toLowerCase()}`, { ['!cursor-not-allowed']: disabled }]"
            class="iti__flag ml-1 mr-1"
          />
        </template>
        <template #default>
          <button
            :disabled="disabled"
            class="py-3 outline-none disabled:cursor-not-allowed"
            tabindex="0"
            @click.stop="
              () => {
                onToggle();
                playMeh();
              }
            "
          >
            {{ selectedValue }}
          </button>
        </template>
        <template #append>
          <ChevronDownIcon
            :class="{ ['rotate-180']: active }"
            class="h-[30px] w-[30px] transition-transform duration-200"
          />
        </template>
      </WInput>
    </div>
    <ul
      v-show="active"
      ref="dropdown"
      :class="$style.dropdown"
      class="wc-scrollbar z-[1] flex max-h-[340px] flex-col gap-2 overflow-y-auto bg-white p-1 wc-border wc-rounded"
    >
      <li
        v-for="o in options"
        :key="o.value"
        ref="optionElements"
        :class="{ ['!bg-sky-500 !text-white']: o.value === modelValue }"
        class="w-full cursor-pointer rounded-[8px] bg-white px-3 py-2 text-left text-black hover:wc-hover-bg"
        @click="onClickSelect(o.value)"
      >
        {{ o.text }}
      </li>
    </ul>
  </div>
</template>

<style module>
.dropdown {
  position: fixed;
  bottom: v-bind('isDirectionUpwards ? dropdownBottom : dropdownTop');
  left: v-bind('dropdownLeft');

  width: 240px;
  min-width: 0;
}
</style>
