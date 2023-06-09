import { toRaw, unref } from 'vue';
import type { MaybeShallowRecordRef } from '../types';

export function getRecordRefRawValue<T extends object>(maybeShallowRecordRef: MaybeShallowRecordRef<T>): T {
  const res = {} as T;
  const keys = Object.keys(maybeShallowRecordRef);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as keyof T;
    res[key] = toRaw(unref(maybeShallowRecordRef[key])) as any;
  }
  return res;
}
