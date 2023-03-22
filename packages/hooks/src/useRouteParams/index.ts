import type { Ref } from 'vue';
import { computed, nextTick, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ReactiveRouteOptions } from '../types/router';

export type { ReactiveRouteOptions } from '../types/router';
export function useRouteParams<T extends null | undefined | string | string[] = null | string | string[]>(name: string, defaultValue?: T, options?: ReactiveRouteOptions): Ref<T>;
export function useRouteParams<T extends string | string[]>(
  name: string,
  defaultValue?: T,
  {
    mode = 'push',
    route = useRoute(),
    router = useRouter(),
  }: ReactiveRouteOptions = {},
) {
  if (!route.name)
    throw new Error('useRouteParams must used named route');
  return computed<any>({
    get() {
      const data = route.params[name];
      if (data == null)
        return defaultValue ?? null;
      if (Array.isArray(data))
        return data.filter(Boolean);
      return data;
    },
    set(v) {
      nextTick(() => {
        router[unref(mode)]({ ...route, params: { ...route.params, [name]: v } });
      });
    },
  });
}