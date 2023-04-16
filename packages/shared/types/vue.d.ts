import type { ComputedRef, Ref, PropType as VuePropType } from 'vue';

declare global{

  declare type PropType<T> = VuePropType<T>;

  declare type EmitType = (event: string, ...args: any[]) => void;

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
  // 解决类型嵌套过深的问题
  // declare type MaybeRef<T> = T | Ref<T>;
  declare type MaybeRef<T> = Ref<UnwrapRef<T>> | T;

  declare type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

  declare type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

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
  declare type MaybeShallowRecordRef<T extends Recordable> = {
    [P in keyof T]: MaybeRef<T[P]>;
  };
  /**
   * @description 深层的RecordRef
   */
  declare type MaybeRecordRef<T extends Recordable> = {
    [P in keyof T]: T[P] extends Recordable ? MaybeRecordRef<T[P]> : MaybeRef<T[P]>;
  };

  declare type ToRawByRecordRef<T extends Recordable> = {
    [P in keyof T]: T[P] extends Ref<infer U>
      ? U
      : T[P] extends Recordable
        ? ToRawByRecordRef<T[P]>
        : T[P]
  };

}
