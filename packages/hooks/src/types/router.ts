import type { useRoute, useRouter } from 'vue-router';
export interface ReactiveRouteOptions {
  mode?: MaybeRef<'replace' | 'push'>;
  route?: ReturnType<typeof useRoute>;
  router?: ReturnType<typeof useRouter>;
}
