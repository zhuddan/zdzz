import type { ElRef, Fn } from '@zdzz/shared';
import { onMounted, onUnmounted, unref } from 'vue';

type WindowType = Window & typeof globalThis;
type WindowEvent = keyof WindowEventMap;
type HTMLElementEvent = keyof HTMLElementEventMap;
type MaybeElement = ElRef | HTMLElement | string | WindowType;

export function useEventListener<T extends MaybeElement>(
  target: T,
  event: T extends WindowType ? WindowEvent : HTMLElementEvent,
  callback: Fn,
  immediate = false,
) {
  function getTarget(): HTMLElement | WindowType | Element {
    if (target instanceof HTMLElement)
      return target;
    if (typeof target == 'string')
      return document.querySelector(target)!;
    return unref(target) as HTMLElement;
  }
  onMounted(() => {
    getTarget()?.addEventListener(event, callback);
  });
  onUnmounted(() => {
    getTarget()?.removeEventListener(event, callback);
  });
  immediate && callback();
}
