<script setup lang="ts">
import { mdiChevronDown } from '@mdi/js';
import { vOnClickOutside } from '@vueuse/components';
import { computed, PropType, ref } from 'vue';

import WIcon from '@/components/WIcon';
import WInput from '@/components/WInput';
import WLabel from '@/components/WLabel';
import { useDropdown } from '@/composables/useDropdown';
import { useIds } from '@/composables/useIds';
import { IOption } from '@/types';

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array as PropType<IOption[]>, required: true },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

const id = useIds().get();
const active = ref(false);
const input = ref<typeof WInput>();
const dropdown = ref<HTMLElement>();
const optionElements = ref<Array<HTMLDivElement>>([]);
const currentIndex = computed({
  get() {
    return props.options.findIndex((op) => op.value === props.modelValue);
  },
  set(index) {
    emit('update:modelValue', props.options[index].value);
  },
});

const onToggle = () => {
  if (props.disabled) return;

  input.value?.inputElement?.focus();
  active.value = !active.value;
};
const onClickSelect = (value: number | string) => {
  if (props.disabled) return;

  emit('update:modelValue', value);
  active.value = false;
};
const onMoveSelect = (index: number) => {
  if (props.disabled) return;
  if (index < 0 || index >= props.options.length) return;

  currentIndex.value = index;
  optionElements.value[index]?.scrollIntoView({ block: 'nearest' });
  active.value = true;
};

const { isDirectionUpwards, dropdownBottom, dropdownLeft, dropdownTop, dropdownWidth } =
  useDropdown({
    rootEl: input,
    dropdownEl: dropdown,
    show: active,
  });

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
};
</script>
<template>
  <div class="wc-base" v-on-click-outside="() => (active = false)">
    <WLabel :for="id" :disabled="disabled">
      {{ label }}
    </WLabel>
    <WInput
      :id="id"
      ref="input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      readonly
      @click="onToggle"
      @keydown.stop="onKeyDown"
    >
      <template #append>
        <WIcon
          :path="mdiChevronDown"
          :class="{ ['rotate-180']: active }"
          class="h-[30px] w-[30px] transition-transform duration-200"
        />
      </template>
    </WInput>

    <ul
      v-show="active"
      :id="id"
      ref="dropdown"
      :class="$style.dropdown"
      class="wc-scrollbar z-[1] flex max-h-[196px] flex-col overflow-y-auto bg-white p-1 wc-border wc-rounded"
    >
      <li
        v-for="(o, idx) in options"
        :key="idx"
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

  width: v-bind('dropdownWidth');
  min-width: 0;
}
</style>
