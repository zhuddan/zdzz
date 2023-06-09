import type { PluginOption, UserConfig } from 'vite';
import type { OutputOptions } from 'rollup';
import vuePlugin from '@vitejs/plugin-vue';
import { createDtsPlugin } from './types';
import { distOutput, preserveModulesOutput } from './output';
import { EXTERNAL } from './const';

export type PackageName = `zd_${'shared' | 'hooks' | 'components'}` ;
 type OutputType = 'dist' | 'es' | 'lib';

type CreatePluginsOptions = Partial<{
  replacePath: boolean;
  vue: boolean;
  output: OutputType[];
  plugins: PluginOption[];
  dts: boolean;
}>;

export function createPlugins(options: CreatePluginsOptions = {}): PluginOption[] {
  const defaultOptions: CreatePluginsOptions = {
    dts: true,
  };
  const opt = { ...defaultOptions, ...options };
  const plugins: PluginOption[] = [];
  if (opt?.vue) {
    plugins.push(
      vuePlugin(),
    );
  }
  if (opt?.dts) {
    plugins.push(
      createDtsPlugin({
        output: options?.output,
        replacePath: options?.replacePath,
      }),
    );
  }
  return plugins;
}

export function createOutputOptions(packageName: string, dir: OutputType[] = ['dist', 'es', 'dist']) {
  const outputOptions: OutputOptions[] = [];
  if (dir.includes('dist')) {
    outputOptions.push(
      distOutput('iife', packageName),
      distOutput('es'),
      distOutput('cjs'),
    );
  }
  if (dir.includes('es'))
    outputOptions.push(preserveModulesOutput('es'));
  if (dir.includes('lib'))
    outputOptions.push(preserveModulesOutput('cjs', 'lib'));
  return outputOptions;
}

export const createBuildConfig = (packageName: PackageName, options?: CreatePluginsOptions): UserConfig => {
  return {
    plugins: [
      ...createPlugins(options),
      ...(options?.plugins || []),
    ],
    build: {
      target: 'modules',
      cssCodeSplit: true,
      minify: true,
      chunkSizeWarningLimit: 1000,
      lib: {
        entry: './src/index.ts',
      },
      rollupOptions: {
        external: EXTERNAL,
        output: createOutputOptions(packageName, options?.output),
      },
    },
  };
};
