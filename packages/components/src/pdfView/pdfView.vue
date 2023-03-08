<script setup lang="ts">
import 'pdfjs-dist/build/pdf.worker.entry';
import { nextTick, ref, watch } from 'vue';
import type { PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.js';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
// import { sleep } from '@zdzz/shared';
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
});
defineOptions({
  name: 'PdfView',
});

const canvasRef = ref<Array<HTMLCanvasElement>>();
const numPages = ref(0);
const loading = ref(false);
const isError = ref(false);
const errorMsg = ref('');
async function update() {
  const loadingTask = getDocument(props.url);
  loading.value = true;
  isError.value = false;
  loadingTask.promise
    .then(async (pdf) => {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        numPages.value = pageNum;
        await nextTick();
        if (canvasRef.value && canvasRef.value.length) {
          // 每10页休息一下，避免页面卡顿
          // if (pageNum % 10 == 0)
          // await sleep();
          await render(pdf, pageNum);
        }
      }
    })
    .catch((e) => {
      errorMsg.value = e.message;
      isError.value = true;
      numPages.value = 0;
    }).
    finally(() => {
      loading.value = false;
    });
}

async function render(pdf: PDFDocumentProxy, pageNum: number) {
  const canvas = canvasRef.value![pageNum - 1] as HTMLCanvasElement;
  const page = await pdf.getPage(pageNum);
  // 解决页面显示太模糊的问题
  const scale = 2;
  const viewport = page.getViewport({ scale });
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport,
  };
  page.render(renderContext as any);
}

watch(() => props.url, update, { immediate: true });
</script>

<template>
  <div :class="[loading]" class="pdf-view">
    <template v-if="!isError">
      <div v-for="item in numPages" :key="item" class="pdf-pages-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>
    </template>
    <div
      v-else
      class="error-wrap"
    >
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pdf-view{
  min-height: 300px;

  canvas {
    width: 100%;
  }

  .pdf-pages-wrapper {
    border: 1px solid #cfcfcf;

    + .pdf-pages-wrapper {
      margin-top: 10px;
    }
  }

  .error-wrap{
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
  }

}
</style>
