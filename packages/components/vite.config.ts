import { createConfig, createtTypes } from '../../script/config';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  if (mode == 'type') return createtTypes({ vue: true, output: ['dist'] });
  return createConfig('zd_components', { vue: true });
});
