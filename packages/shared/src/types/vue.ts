import type { ComputedRef, Ref } from 'vue';

export type MaybeRef<T> = T | Ref<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;
