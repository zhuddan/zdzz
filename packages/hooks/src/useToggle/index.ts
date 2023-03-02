import { isRef, ref } from 'vue';
import type { MaybeRef } from '@zdzz/shared';
export function useToggle(initValue: MaybeRef<boolean> = false) {
  const state = isRef(initValue) ? initValue : ref(initValue);
  function toggle(value?: boolean) {
    if (value) {
      state.value = value;
      return;
    }
    state.value = !state.value;
  }

  return [state, toggle] as const;
}