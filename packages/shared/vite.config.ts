import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      dts({
        outputDir: 'dist/es',
        tsConfigFilePath: './tsconfig.json',
      }),
      dts({
        outputDir: 'dist/lib',
        tsConfigFilePath: './tsconfig.json',
      }),
    ],
    build: {
      target: 'modules',
      // 打包文件目录
      outDir: 'dist/es',
      // 压缩
      minify: true,
      // css分离
      // cssCodeSplit: true,
      rollupOptions: {
        input: ['src/index.ts'],
        output: [
          {
            format: 'es',
            // 不用打包成.es.js,这里我们想把它打包成.js
            entryFileNames: '[name].js',
            // 让打包目录和我们目录对应
            preserveModules: true,
            // 配置打包根目录
            dir: 'dist/es',
            preserveModulesRoot: 'src',
          },
          {
            format: 'cjs',
            entryFileNames: '[name].js',
            // 让打包目录和我们目录对应
            preserveModules: true,
            // 配置打包根目录
            dir: 'dist/lib',
            preserveModulesRoot: 'src',
          },
        ],
      },
      lib: {
        entry: './src/index.ts',
      },
    },
  };
});
