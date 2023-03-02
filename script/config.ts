import type { UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

export const packagesConfig: UserConfig = {
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      outputDir: ['dist', 'lib', 'es'],
    }),
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',
    minify: false,
    chunkSizeWarningLimit: 1000,
    lib: {
      entry: './src/index.ts',
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          globals: {
            vue: 'Vue',
          },
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'es',
          preserveModulesRoot: 'src',
        },
        {
          globals: {
            vue: 'Vue',
          },
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'lib',
          preserveModulesRoot: 'src',
        },
        // dist
        {
          globals: {
            vue: 'Vue',
          },
          format: 'iife',
          entryFileNames: '[name].js',
          dir: 'dist',
          name: 'zd',
        },
        {
          globals: {
            vue: 'Vue',
          },
          format: 'es',
          entryFileNames: '[name].es.js',
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
        {
          globals: {
            vue: 'Vue',
          },
          format: 'cjs',
          entryFileNames: '[name].cjs.js',
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
};
export default packagesConfig;
