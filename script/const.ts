export const EXTERNAL = [
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

export const GLOBALS = {
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
