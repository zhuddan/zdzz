import type { ModuleFormat, OutputOptions } from 'rollup';
import { GLOBALS } from './const';

// dist
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

// 按照文件夹打包
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
