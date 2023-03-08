import { onMounted, onUnmounted, unref } from 'vue';

type MaybeElement = ElRef | HTMLElement | string | (Window & typeof globalThis);

export function useEventListener(target: MaybeElement, event: string, callback: Fn, immediate = false) {
  function getTarget() {
    if (target instanceof HTMLElement)
      return target;

    if (typeof target == 'string')
      return document.querySelector(target);

    return unref(target);
  }
  immediate && callback();
  onMounted(() => getTarget()?.addEventListener(event, callback));
  onUnmounted(() => getTarget()?.removeEventListener(event, callback));
}
