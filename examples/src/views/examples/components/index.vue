<script setup lang="ts">
import type { PDFRenderInstance } from '../../../../../packages/components/src/PDFRender';
import { PDFRender } from '../../../../../packages/components/src/PDFRender';
import { ExcelRender } from '../../../../../packages/components/src/ExcelRender';
import '../../../../../packages/components/src/style.scss';
import { onMounted, ref } from 'vue';
onMounted(() => {
});

function handleError(e: string) {
  console.log(e);
}
</script>

<template>
  <div class="">
    <ExcelRender url="/a.xls" />
    <ExcelRender url="/l.pdf" @error="handleError" />
    <!-- <PDFRender ref="pdfViewRef" url="/a.pdf" /> -->
  </div>
</template>

<style scoped>
.box{
  width: 300px;
  height: 200px;
  overflow-y: scroll;
}
</style>