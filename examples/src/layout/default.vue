<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import AppMain from '../components/AppMain.vue';
import { computed, ref } from 'vue';
import { useWatermark } from '@zdzz/hooks/src';
const layoutRef = ref<Nullable<HTMLElement>>(null);
function getWatermark() {
  const now = new Date();
  return `版权所有@XXXX ${now.toLocaleDateString()}-${now.toLocaleTimeString()}`;
}
const name = ref(getWatermark());
const rotate = ref(0);
const now = computed(() => {
  const n = new Date();
  return `${n.getFullYear()}`;
});
setInterval(() => {
  name.value = getWatermark();
}, 100);
// const { removeWatermark } = useWatermark(layoutRef, name, { font: '15px Vedana', rotate: (-10 * Math.PI) / 180, height: 80 });
</script>

<template>
  <section ref="layoutRef" class="layout">
    <AppHeader />
    <AppMain />
    <AppFooter />
  </section>
</template>

<style scoped lang="scss">
  .layout{
    min-height: 100vh;
    display: flex;
    flex-direction: column;

  }
</style>