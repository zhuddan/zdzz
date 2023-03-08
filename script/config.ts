import type { PluginOption, UserConfig } from 'vite';
import type { ModuleFormat, OutputOptions } from 'rollup';
import dts from 'vite-plugin-dts';
import vuePlugin from '@vitejs/plugin-vue';
import DefineOptions from 'unplugin-vue-define-options/vite';
type PackageName = `zd_${'shared' | 'hooks' | 'components'}` ;
dts;
const GLOBALS = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'Axios',
  qs: 'qs',
  'pdfjs-dist': 'pdfjsLib',
  'pdfjs-dist/legacy/build/pdf.js': 'pdfjsLib',
  '@zdzz/shared': 'zd_shared',
  '@zdzz/hooks': 'zd_hooks',
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
  /\.scss/,
];

export function distOutput(moduleFormat: ModuleFormat, name?: string): OutputOptions {
  return {
    globals: GLOBALS,
    format: moduleFormat,
    entryFileNames: `[name]${moduleFormat === 'iife' ? '' : `.${moduleFormat}`}.js`,
    dir: 'dist',
    preserveModulesRoot: 'src',
    name,
  };
}

export function preserveModulesOutput(format: ModuleFormat, dir?: string): OutputOptions {
  return {
    globals: GLOBALS,
    format,
    entryFileNames: '[name].js',
    preserveModules: true,
    dir: dir || format,
    preserveModulesRoot: 'src',
  };
}

export const createConfig = (
  packageName: PackageName,
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
      // target: 'es2015',
      target: 'modules',
      cssCodeSplit: true,
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
          distOutput('iife', packageName),
          distOutput('es'),
          distOutput('cjs'),
        ],
      },
    },
  };
};
export default createConfig;
