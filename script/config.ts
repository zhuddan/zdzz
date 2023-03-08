import type { PluginOption, UserConfig } from 'vite';
import type { ModuleFormat } from 'rollup';
import dts from 'vite-plugin-dts';
import vuePlugin from '@vitejs/plugin-vue';
import DefineOptions from 'unplugin-vue-define-options/vite';

const GLOBALS = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'Axios',
  qs: 'qs',
  'pdfjs-dist': 'pdfjsLib',
  'pdfjs-dist/legacy/build/pdf.js': 'pdfjsLib',
  '@zdzz/shared': 'ZdzzShared',
  '@zdzz/hooks': 'ZdzzHooks',
};

const EXTERNAL = [
  'vue',
  'vue-router',
  'qs',
  'axios',
  'pdfjs-dist',
  'pdfjs-dist/build/pdf.worker.entry',
  'pdfjs-dist/legacy/build/pdf.js',
  '@zdzz/shared',
  '@zdzz/hooks',
];

const baseOutput = (moduleFormat: ModuleFormat, name?: string) => {
  return {
    globals: GLOBALS,
    format: moduleFormat,
    entryFileNames: `[name]${moduleFormat === 'iife' ? '' : `.${moduleFormat}`}.js`,
    dir: 'dist',
    preserveModulesRoot: 'src',
    name,
  };
};

const preserveModulesOutput = (moduleFormat: ModuleFormat, dir?: string) => {
  return {
    globals: GLOBALS,
    format: moduleFormat,
    entryFileNames: '[name].js',
    preserveModules: true,
    dir: dir || moduleFormat,
    preserveModulesRoot: 'src',
  };
};

export const createConfig = (
  packageName: string,
  options?: Partial<{
    replacePath: boolean;
    vue: boolean;
  }>,
): UserConfig => {
  const replacePath = options?.replacePath || false;
  const isVue = options?.vue || false;
  const basePlugins: PluginOption[] = [];
  if (isVue) basePlugins.push(vuePlugin(), DefineOptions());
  return {
    plugins: [
      ...basePlugins,
      dts({
        include: ['src/**/*.ts', 'type.d.ts', 'src/**/*.vue'],
        outputDir: ['dist', 'es', 'lib'],
        beforeWriteFile(filePath: string, content) {
          const filePathOut = filePath
            .replace(/dist\/src\//, 'dist/')
            .replace(/es\/src\//, 'es/')
            .replace(/lib\/src\//, 'lib/');
          return {
            filePath: replacePath ? filePath : filePathOut,
            content,
          };
        },
      }),
    ],
    build: {
      target: 'es2015',
      outDir: 'dist',
      minify: true,
      chunkSizeWarningLimit: 1000,
      lib: {
        entry: './src/index.ts',
      },
      rollupOptions: {
        external: EXTERNAL,
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
