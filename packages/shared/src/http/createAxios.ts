import type { CreateAxiosOptions } from './core/axiosTransform';

import { VAxios } from './core/Axios';
import { merge } from 'lodash-es';
import { defaultConfig } from './config/default';

export function createAxios(opt: Partial<CreateAxiosOptions> = {}) {
  const options = merge(defaultConfig, opt);
  return new VAxios(options);
}
