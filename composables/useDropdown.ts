import { useElementBounding } from '@vueuse/core';
import { computed, Ref } from 'vue';

import WInput from '@/components/WInput';

export const useDropdown = ({
  rootEl,
  dropdownEl,
  show,
}: {
  rootEl: Ref<typeof WInput | HTMLElement | undefined>;
  dropdownEl: Ref<HTMLElement | undefined>;
  show: Ref<boolean>;
}) => {
  const r = useElementBounding(rootEl as Ref<HTMLElement>);
  const d = useElementBounding(dropdownEl);
  const isDirectionUpwards = computed(() => {
    if (!show.value) return false;
    const distanceFromBottom = window.innerHeight - r.bottom.value;
    const distanceFromTop = r.top.value;
    const dropdownHeight = d.height.value;
    return distanceFromBottom < dropdownHeight + 8 && distanceFromTop > dropdownHeight + 8;
  });
  const dropdownBottom = computed(() => (show.value ? `${window.innerHeight - r.top.value + 8}px` : ''));
  const dropdownLeft = computed(() => (show.value ? `${r.left.value}px` : ''));
  const dropdownWidth = computed(() => (show.value ? `${r.width.value - 4}px` : ''));
  const dropdownTop = computed(() => (show.value ? `${window.innerHeight - r.bottom.value - d.height.value - 8}px` : ''));

  return {
    isDirectionUpwards,
    dropdownBottom,
    dropdownLeft,
    dropdownTop,
    dropdownWidth,
  };
};
