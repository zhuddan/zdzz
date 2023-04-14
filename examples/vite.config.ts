import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // default
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'types'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@zdzz/shared',
      '@zdzz/hooks',
      '@zdzz/components',
    ],
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    // include: ['@iconify/iconify', '@purge-icons/generated'],
  },
});
