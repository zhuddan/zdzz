<script setup lang="ts">
import 'pdfjs-dist/build/pdf.worker.entry';
import { nextTick, ref, useSlots, watch } from 'vue';
import type { PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.js';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
import { sleep } from '@zdzz/shared';
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['error']);

defineOptions({
  name: 'PdfRender',
});

const canvasRef = ref<Array<HTMLCanvasElement>>();
const numPages = ref(0);
const loading = ref(false);
const isError = ref(false);
const errorMsg = ref('');
const slots = useSlots();
// let pdfDoc: Nullable<PDFDocumentProxy> = (null);
async function update() {
  if (!props.url) return;
  loading.value = true;
  isError.value = false;
  const loadingTask = getDocument(props.url);
  loadingTask.promise
    .then(async (pdf) => {
      // pdfDoc = pdf;
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        numPages.value = pageNum;
        await nextTick();
        if (canvasRef.value && canvasRef.value.length) {
          // 每10页休息一下，避免页面卡顿
          if (pageNum % 10 == 0) await sleep();
          console.log(pageNum);
          await render(pdf, pageNum);
        }
      }
    })
    .catch((e) => {
      errorMsg.value = e.message.replace('Missing PDF', '找不到PDF');
      isError.value = true;
      numPages.value = 0;
      emit('error', errorMsg.value);
    }).
    finally(() => {
      loading.value = false;
    });
}

async function render(pdf: PDFDocumentProxy, pageNum: number) {
  await nextTick();
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
</script>

<template>
  <div :class="[loading]" class="pdf-render">
    <template v-if="!isError">
      <div v-for="item in numPages" :key="item" class="pdf-pages-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>
    </template>
    <template v-if="slots.default">
      <slot :error-msg="errorMsg" :update="update"></slot>
    </template>
    <ErrorRender v-else :is-error="isError" :error-msg="errorMsg" @refresh="update">
      <template v-if="slots.error" #error>
        <slot name="error" :error-msg="errorMsg"></slot>
      </template>
      <template v-if="slots['refresh-btn']" #refresh-btn>
        <slot name="refresh-btn" :update="update"></slot>
      </template>
    </ErrorRender>
  </div>
</template>

