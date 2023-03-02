import { ref } from 'vue';
export function useToggle() {
  const state = ref(false);
  function toggle() {
    state.value = !state.value;
  }

  return [state, toggle] as const;
}