import { createConfig } from '../../script/config';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return createConfig('ZdzzComponents', {
    vue: true,
  });
});
