import type { ComputedRef, MaybeRef, Ref } from 'vue';

export type EmitType = (event: string, ...args: any[]) => void;

export type ElRef<T extends HTMLElement = HTMLDivElement> = T | null;
// 解决类型嵌套过深的问题
// type MaybeRef<T> = T | Ref<T>;
// type MaybeRef<T> = Ref<UnwrapRef<T>> | T;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

/**
 * @description 浅层的RecordRef
 * @example
 *  interface User {
 *    name: sting;
 *    age: number;
 *  }
 * const user1: MaybeShallowRecordRef<User> = {
 *    name: "Tom", //
 *    age: 1, //
 * }
 * const name = ref("Tom")
 * const age = ref(1)
 * const user2: MaybeShallowRecordRef<User> = {
 *    name: name, //
 *    age: 1, //
 * }
 */
export type MaybeShallowRecordRef<T extends object> = {
  [P in keyof T]: MaybeRef<T[P]>;
};
/**
 * @description 深层的RecordRef
 */
export type MaybeRecordRef<T extends object> = {
  [P in keyof T]: T[P] extends object ? MaybeRecordRef<T[P]> : MaybeRef<T[P]>;
};

export type ToRawByRecordRef<T extends object> = {
  [P in keyof T]: T[P] extends Ref<infer U>
    ? U
    : T[P] extends object
      ? ToRawByRecordRef<T[P]>
      : T[P]
};