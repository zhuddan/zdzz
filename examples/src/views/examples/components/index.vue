<script setup lang="ts">
import { ExcelRender } from '../../../../../packages/components/src';
import '@zdzz/components/dist/style.css';
const successUrl = 'http://47.101.37.41:8081/api/sys/pdf/parkReportExcelDownload?unitId=312&startMonth=202301&endMonth=202303&isPark=1&reportType=first1';
const errorUrl = 'http://47.101.37.41:8081/profile/upload/2023/03/24/综合月报导入模板 (4)_20230324155451A234.xls';
</script>

<template>
  <div class="">
    <!-- <ExcelRender :url="successUrl" /> -->
    <ExcelRender :url="errorUrl" />
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