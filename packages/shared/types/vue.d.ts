import type { ComputedRef, Ref, PropType as VuePropType } from 'vue';

declare global{

  declare type PropType<T> = VuePropType<T>;

  declare type EmitType = (event: string, ...args: any[]) => void;

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  declare type MaybeRef<T> = T | Ref<T> ;

  declare type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

  declare type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

  declare type MaybeRecordRef<T extends Recordable> = {
    [P in keyof T]: T[P] extends Recordable ? MaybeRecordRef<T[P]>
      : MaybeRef<T[P]>;
  };

  declare type ToRawByRecordRef<T extends Recordable> = {
    [P in keyof T]: T[P] extends Ref<infer U>
      ? U
      : T[P] extends Recordable
        ? ToRawByRecordRef<T[P]>
        : T[P]
  };

}
