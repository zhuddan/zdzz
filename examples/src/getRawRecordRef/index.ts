import { isObject } from '@zdzz/shared';
// import type { Ref } from 'vue';
import { isRef, toRaw, unref } from 'vue';

// export function getRawRecordRef<T extends Ref<T>>(maybeRecordRef: MaybeRecordRef<T>): ToRawByRecordRef<T>;
export function getRawRecordRef<T extends Recordable>(maybeRecordRef: MaybeRecordRef<T>): ToRawByRecordRef<T> {
  const res = {} as ToRawByRecordRef<T>;
  const keys = Object.keys(maybeRecordRef);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as keyof T;
    const value = maybeRecordRef[key];
    const rawValue = (isRef(value) ? unref(value)
      : isObject(value)
        ? getRawRecordRef(value)
        : value);
    res[key] = toRaw(rawValue) as any;
  }
  return res;
}

