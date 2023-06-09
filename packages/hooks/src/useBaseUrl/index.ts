import { isLink } from '@zdzz/shared';
import { computed } from 'vue';
import { useComputedRef } from '../useComputedRef';
import type { ComputedRef } from 'vue';
import type { MaybeComputedRef } from '@zdzz/shared';

export function useBaseUrl(_url: MaybeComputedRef<string>, baseUrl = '/'): ComputedRef<string> {
  const urlRef = useComputedRef(_url);
  const url = computed(() => {
    if (isLink(urlRef.value)) return urlRef.value;
    return baseUrl + urlRef.value;
  });
  return url;
}
