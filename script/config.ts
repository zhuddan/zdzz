import type { PluginOption, UserConfig } from 'vite';
import type { ModuleFormat, OutputOptions } from 'rollup';
import dts from 'vite-plugin-dts';
import vuePlugin from '@vitejs/plugin-vue';
import DefineOptions from 'unplugin-vue-define-options/vite';
type PackageName = `zd_${'shared' | 'hooks' | 'components'}` ;

const GLOBALS = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'Axios',
  qs: 'qs',
  'pdfjs-dist': 'pdfjsLib',
  'pdfjs-dist/legacy/build/pdf.js': 'pdfjsLib',
  '@zdzz/shared': 'zd_shared',
  '@zdzz/hooks': 'zd_hooks',
  xlsx: 'XLSX',
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
  'xlsx',
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
type OutputType = 'dist' | 'es' | 'lib';
export const createConfig = (
  packageName: PackageName,
  options?: Partial<{
    replacePath: boolean;
    vue: boolean;
    output: OutputType[];
    plugins: PluginOption[];
  }>,
): UserConfig => {
  const replacePath = options?.replacePath || false;

  const output = options?.output || ['dist', 'es', 'lib'];
  const outputOptions: OutputOptions[] = [];
  if (output.includes('dist')) {
    outputOptions.push(
      distOutput('iife', packageName),
      distOutput('es'),
      distOutput('cjs'),
    );
  }

  if (output.includes('es'))
    outputOptions.push(preserveModulesOutput('es'));

  if (output.includes('lib'))
    outputOptions.push(preserveModulesOutput('cjs', 'lib'));

  const isVue = options?.vue || false;
  const basePlugins: PluginOption[] = [];
  if (isVue) basePlugins.push(vuePlugin(), DefineOptions());
  return {
    plugins: [
      ...basePlugins,
      dts({
        include: ['src/**/*.ts', 'type.d.ts', 'src/**/*.vue'],
        outputDir: output,
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
      ...(options?.plugins || []),
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
        output: outputOptions,
      },
    },
  };
};
export default createConfig;
