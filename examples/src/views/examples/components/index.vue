<script setup lang="ts">
import type { ExcelRenderInstance } from '@zdzz/components';
import { ExcelRender } from '@zdzz/components';

import '@zdzz/components/es/style.css';

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
    <ExcelRender v-slot="{ errorMsg, update }" url="url">
      <div icon="error" title="预览失败" :sub-title="errorMsg">
        {{ errorMsg }}
        <button @click="update">
          刷新
        </button>
      </div>
    </ExcelRender>
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

<style scoped>
.box{
  width: 300px;
  height: 200px;
  overflow-y: scroll;
}
</style>