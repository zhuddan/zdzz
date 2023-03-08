<script setup lang="ts">
import type { PdfViewInstance } from '../../../../../packages/components/src/pdfView';
import { PdfView } from '../../../../../packages/components/src/pdfView';
import '../../../../../packages/components/src/pdfView/style/index.scss';
import { onMounted, ref } from 'vue';
const pdfViewRef = ref<Nullable<PdfViewInstance>>();
onMounted(() => {
  console.log(pdfViewRef.value?.update);
});
</script>

<template>
  <div>
    <PdfView ref="pdfViewRef" url="/as.pdf" />
  </div>
</template>

<style scoped>

</style>