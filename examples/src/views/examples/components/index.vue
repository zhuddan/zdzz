<script setup lang="ts">
import type { ExcelRenderInstance } from '@zdzz/components';
// import { ExcelRender } from '@zdzz/components';

import { PDFRender } from '../../../../../packages/components/src/';

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
</script>

<template>
  <div class="">
    <PDFRender url="url22.a">
      <!-- <div icon="error" title="预览失败" :sub-title="errorMsg">
        {{ errorMsg }}
        <button @click="update">
          刷新
        </button>
      </div> -->
      <!-- <template #loading>
        loading
      </template> -->
    </PDFRender>
    <!-- <ExcelRender v-slot="{ errorMsg, update }" url="/2a.xls">
      <button @click="update">
        update
      </button>
    </ExcelRender> -->
    <!-- <ExcelRender ref="excelRef" url="/l.pdf" @error="handleError" />
    <Icon icon="vue.svg" />
    <Icon icon="ep:plus" color="red" :size="120" />
    <button @click="handleDownload">
      handleDownload
    </button> -->
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