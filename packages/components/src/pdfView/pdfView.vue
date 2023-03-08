<script setup lang="ts">
import 'pdfjs-dist/build/pdf.worker.entry';
import { nextTick, onMounted, ref, useSlots, watch } from 'vue';
import type { PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.js';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
import { sleep } from '@zdzz/shared';
// import './style/index.scss';

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
          if (pageNum % 10 == 0)
            await sleep();
          await render(pdf, pageNum);
        }
      }
    })
    .catch((e) => {
      console.log(e);
      errorMsg.value = e.message.replace('Missing PDF', '找不到PDF');
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
defineExpose({
  update,
});
const slot = useSlots();
onMounted(() => {
  console.log(slot);
});
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
      <div v-if="slot?.error">
        <slot name="error"></slot>
      </div>

      <template v-else>
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon-error"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" /></svg>
        <p>
          {{ errorMsg }}
        </p>
      </template>
      <button class="refresh-btn" @click="update">
        刷新
      </button>
    </div>
  </div>
</template>

