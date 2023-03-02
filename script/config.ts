import type { UserConfig } from 'vite';
import type { ModuleFormat } from 'rollup';

import dts from 'vite-plugin-dts';
const baseOutput = (moduleFormat: ModuleFormat, name?: string) => {
  return {
    globals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
    },
    format: moduleFormat,
    entryFileNames: `[name]${moduleFormat === 'iife' ? '' : `.${moduleFormat}`}.js`,
    dir: 'dist',
    preserveModulesRoot: 'src',
    name,
  };
};
const preserveModulesOutput = (moduleFormat: ModuleFormat, dir?: string) => {
  return {
    globals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
    },
    format: moduleFormat,
    entryFileNames: '[name].js',
    preserveModules: true,
    dir: dir || moduleFormat,
    preserveModulesRoot: 'src',
  };
};

export const createConfig = (packageName: string): UserConfig => {
  return {
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
        external: ['vue', 'vue-router'],
        output: [
          // preserveModules
          preserveModulesOutput('es'),
          preserveModulesOutput('cjs', 'lib'),
          // dist
          baseOutput('iife', packageName),
          baseOutput('es'),
          baseOutput('cjs'),
        ],
      },
    },
  };
};
export default createConfig;
