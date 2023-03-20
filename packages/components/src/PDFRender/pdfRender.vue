<script setup lang="ts">
import 'pdfjs-dist/build/pdf.worker.entry';
import { Comment, computed, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import type { PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.js';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
import { Loading } from '../Loading';
import { sleep } from '@zdzz/shared';
import { Icon } from '../Icon';

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['error']);

defineOptions({
  name: 'PDFRender',
});

const canvasRef = ref<HTMLCanvasElement[]>([]);
const numPages = ref(0);
const loading = ref(false);
const isError = ref(false);
const errorMsg = ref('');
const slots = useSlots();
const isCommentSlot = computed(() => {
  if (!slots.default) return true;
  return slots.default?.()?.every(e => e.type === Comment);
});
async function render() {
  if (!props.url) return;
  loading.value = true;
  isError.value = false;
  const loadingTask = getDocument(props.url);
  loadingTask.promise
    .then(async (pdf) => {
      loading.value = false;
      numPages.value = pdf.numPages;
      await nextTick();
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (canvasRef.value && canvasRef.value.length) {
          // 每10页休息一下，避免页面卡顿
          if (pageNum % 10 == 0) await sleep();
          await renderPage(pdf, pageNum);
        }
      }
    })
    .catch((e) => {
      console.log(e);
      errorMsg.value = e.message.replace('Missing PDF', '找不到PDF');
      isError.value = true;
      numPages.value = 0;
      emit('error', errorMsg.value);
    }).
    finally(() => {
      loading.value = false;
    });
}

async function renderPage(pdf: PDFDocumentProxy, pageNum: number) {
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

watch(() => props.url, render, { immediate: true });
defineExpose({
  render,
});
</script>

<template>
  <div class="pdf-render">
    <template v-if="!isError && !loading">
      <div v-for="item in numPages" :key="item" class="pdf-pages-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>
    </template>
    <template v-else>
      <template v-if="loading">
        <slot v-if="slots.loading" name="loading"></slot>
        <Loading v-else class="inner" />
      </template>
      <template v-if="isError">
        <template v-if="!isCommentSlot">
          <slot :error-msg="errorMsg" :is-error="isError" :loading="loading" :update="render"></slot>
        </template>

        <template v-else>
          <slot v-if="slots.error" name="error" :error-msg="errorMsg"></slot>
          <template v-else>
            <div class="error-inner inner">
              <Icon icon="ep:circle-close-filled" color="#f56c6c" size="64" />
              <p>
                {{ errorMsg }}
              </p>
            </div>
          </template>

          <template v-if="slots['refresh-btn']">
            <slot name="refresh-btn" :update="render"></slot>
          </template>

          <template v-else>
            <div style="text-align: center;">
              <button class="button error" @click="render">
                刷新
              </button>
            </div>
          </template>
        </template>
      </template>
    </template>
  </div>
</template>

