import type { ComputedRef, Ref, PropType as VuePropType } from 'vue';

declare global{

  type PropType<T> = VuePropType<T>;

  type EmitType = (event: string, ...args: any[]) => void;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
  // 解决类型嵌套过深的问题
  // type MaybeRef<T> = T | Ref<T>;
  type MaybeRef<T> = Ref<UnwrapRef<T>> | T;

  type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

  type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

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
  type MaybeShallowRecordRef<T extends Recordable> = {
    [P in keyof T]: MaybeRef<T[P]>;
  };
  /**
   * @description 深层的RecordRef
   */
  type MaybeRecordRef<T extends Recordable> = {
    [P in keyof T]: T[P] extends Recordable ? MaybeRecordRef<T[P]> : MaybeRef<T[P]>;
  };

  type ToRawByRecordRef<T extends Recordable> = {
    [P in keyof T]: T[P] extends Ref<infer U>
      ? U
      : T[P] extends Recordable
        ? ToRawByRecordRef<T[P]>
        : T[P]
  };
}

export {};