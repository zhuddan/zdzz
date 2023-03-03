import type { ComputedRef, Ref } from 'vue';

declare global{
  declare type MaybeRef<T> = T | Ref<T>;
  declare type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;
  declare type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;
}
