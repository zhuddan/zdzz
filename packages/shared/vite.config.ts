import { createBuildConfig } from '../../script/build';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return createBuildConfig('zd_shared', {
    replacePath: false,
  });
});
