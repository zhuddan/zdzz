import { createConfig } from '../../script/config';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return createConfig('ZdzzShared', {
    replacePath: true,
  });
});
