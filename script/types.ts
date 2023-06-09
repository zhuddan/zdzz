import type { PluginOption } from 'vite';
import dts from 'vite-plugin-dts';

export type OutputType = 'dist' | 'es' | 'lib';

export function createDtsPlugin(options?: Partial<{
  replacePath: boolean;
  output: OutputType[];
}>): PluginOption {
  const output = options?.output || ['dist', 'es', 'lib'];
  const replacePath = options?.replacePath || false;
  return dts({
    tsConfigFilePath: '../../tsconfig.json',
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
  });
}