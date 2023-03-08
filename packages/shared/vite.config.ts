import { createConfig } from '../../script/config';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return createConfig('zd_shared', {
    replacePath: true,
  });
});
