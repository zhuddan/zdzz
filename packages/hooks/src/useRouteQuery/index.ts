import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, nextTick, unref } from 'vue';
import type { ReactiveRouteOptions } from '../sharedTypes';

export function useRouteQuery(name: string): Ref<null | string | string[]>;
export function useRouteQuery<T extends null | undefined | string | string[] = null | string | string[]>(name: string, defaultValue?: T, options?: ReactiveRouteOptions): Ref<T>;
export function useRouteQuery<T extends string | string[]>(
  name: string,
  defaultValue?: T,
  {
    mode = 'push',
    route = useRoute(),
    router = useRouter(),
  }: ReactiveRouteOptions = {},
) {
  return computed<any>({
    get() {
      const data = route.query[name];
      if (data == null)
        return defaultValue ?? null;
      if (Array.isArray(data))
        return data.filter(Boolean);
      return data;
    },
    set(v) {
      nextTick(() => {
        router[unref(mode)]({ ...route, query: { ...route.query, [name]: v === defaultValue || v === null ? undefined : v } });
      });
    },
  });
}