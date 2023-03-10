import cpy from 'cpy';
import { dirname, resolve } from 'path';

import { promises as fs } from 'fs';
import sass from 'sass';

import glob from 'fast-glob';

const sourceDir = resolve(__dirname, '../src');
// lib文件
const targetLib = resolve(__dirname, '../lib');
// es文件
const targetEs = resolve(__dirname, '../es');
// dist文件
const targetDist = resolve(__dirname, '../dist');
// src目录
const srcDir = resolve(__dirname, '../src');

const buildScss = async (minify = false) => {
  await cpy(`${sourceDir}/**/*.scss`, targetLib);
  await cpy(`${sourceDir}/**/*.scss`, targetEs);

  const scssFiles = await glob('**/*.scss', { cwd: srcDir, onlyFiles: true });

  for (const path in scssFiles) {
    const filePath = `${srcDir}/${scssFiles[path]}`;
    // 获取less文件字符串
    const scssCode = await fs.readFile(filePath, 'utf-8');
    // 将less解析成css
    const code = await sass.compileString(scssCode, {
      // 指定src下对应less文件的文件夹为目录
      loadPaths: [srcDir, dirname(filePath)],
      style: minify ? 'compressed' : 'expanded',
      // importer: {
      //   findFileUrl(url) { // This works as expected.
      //     return new URL(url.substring(1), srcDir);
      //   },
      // },
    });
    // 拿到.css后缀path
    const cssPath = scssFiles[path].replace('.scss', `${minify ? '.mini.css' : '.css'}`);
    // 将css写入对应目录
    await fs.writeFile(resolve(targetLib, cssPath), code.css);
    await fs.writeFile(resolve(targetEs, cssPath), code.css);
  }
  await cpy(`${targetLib}/style*.css`, targetDist);
};
buildScss();
buildScss(true);