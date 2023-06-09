import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // default
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@zdzz/shared': path.resolve(__dirname, '../packages/shared/src/index.ts'),
      '@zdzz/shared/*': path.resolve(__dirname, '../packages/shared/*'),
      '@zdzz/hooks': path.resolve(__dirname, '../packages/hooks/src/index.ts'),
      '@zdzz/hooks/*': path.resolve(__dirname, '../packages/hooks/*'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@zdzz/shared',
      '@zdzz/hooks',
    ],
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    // include: ['@iconify/iconify', '@purge-icons/generated'],
  },
});
