import type { CreateAxiosOptions } from './core/axiosTransform';

import { VAxios } from './core/Axios';
import { merge } from '../merge';
import { defaultConfig } from './config/default';

export function createAxios(apiUrl: string, options: Partial<CreateAxiosOptions> = {}) {
  const mergeOptions = merge<Partial<CreateAxiosOptions>, Partial<CreateAxiosOptions>>(options, {
    requestOptions: {
      apiUrl,
    },
  });
  const _options = merge(defaultConfig, {
    ...mergeOptions,
  });
  return new VAxios(_options);
}
