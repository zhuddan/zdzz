<script setup lang="ts">
import type { ExcelRenderInstance } from '@zdzz/components';
// import { ExcelRender } from '@zdzz/components';

import { PDFRender } from '../../../../../packages/components/src';

import '../../../../../packages/components/src/style.scss';

// import { ref } from 'vue';
import { download } from '@zdzz/shared';
function handleError(e: string) {
  console.log(e);
}
// const excelRef = ref<Nullable<ExcelRenderInstance>>(null);
function handleDownload() {
  download({
    url: '/a.pdf',
  }).catch((e) => {
    console.error(e);
  });
}
console.log(PDFRender);
</script>

<template>
  <div class="">
    <PDFRender url="http://47.101.37.41:8081/api/sys/reportPdf/bondsReportPdfPreview?reportId=9227" />
  </div>
</template>

<style scoped lang="scss">
.box{
  width: 300px;
  height: 200px;
  overflow-y: scroll;
}

.circular{
  display: inline;
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;

  .path{
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: red;
    stroke-linecap: round;
  }
}

@keyframes loading-rotate {
  to {
    transform: rotate(360deg)
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0
  }

  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px
  }

  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px
  }
}
</style>