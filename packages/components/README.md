# components

业务中常用的vue组件

1. PDFRender

```vue
<script setup lang="ts">
import { PDFRender } from "@zdzz/components";
import type { PDFRenderInstance } from "@zdzz/components";
import "@zdzz/components/es/PDFRender/style.css";

const pdfRef = ref<PDFRenderInstance | null>(null);

function handleError() {}
function update() {
  pdfRef.value?.update();
}
</script>

<template>
  <PDFRender ref="pdfRef" url="./a.pdf" @error="handleError">
    <template #error> 发生错误 </template>
    <template #refresh-btn><button @click="update">刷新</button></template>
  </PDFRender>
</template>
```

1. ExcelRender

```vue
<script setup lang="ts">
import { ExcelRender } from "@zdzz/components";
import type { ExcelRenderInstance } from "@zdzz/components";
import "@zdzz/components/es/ExcelRender/style.css";

const excelfRef = ref<ExcelRenderInstance | null>(null);

function handleError() {}

function update() {
  excelfRef.value?.update();
}
</script>

<template>
  <ExcelRender ref="excelfRef" url="./a.xls" @error="handleError">
    <template #error> 发生错误 </template>
    <template #refresh-btn> <button @click="update">刷新</button></template>
  </ExcelRender>
</template>
```
