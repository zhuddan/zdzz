<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import AppMain from '../components/AppMain.vue';
import { ref } from 'vue';
import { useWatermark } from '@zdzz/hooks/src';

const layoutRef = ref<Nullable<HTMLElement>>(null);
const color = ref('#ff00ff');
const name = ref('哈');

// setInterval(() => {
// name.value += '哈';
// }, 1000);
const [watermark] = useWatermark(layoutRef, name);
</script>

<template>
  <section ref="layoutRef" class="layout">
    <AppHeader />
    <AppMain />
    <AppFooter />
    <watermark />
  </section>
</template>

<style scoped lang="scss">
  .layout{
    min-height: 100vh;
    display: flex;
    flex-direction: column;

  }
</style>