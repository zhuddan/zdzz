import type { MaybeComputedRef } from '@zdzz/shared';
import { isFunction } from '@zdzz/shared';
import { computed, unref } from 'vue';
import type { ComputedRef } from 'vue';

export function useComputedRef<T>(value: MaybeComputedRef<T>): ComputedRef<T> {
  const computedRef = computed(() => isFunction(value) ? (value as any)() : unref(value));
  return computedRef;
}
