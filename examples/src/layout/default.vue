<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import AppMain from '../components/AppMain.vue';
</script>

<template>
  <section class="layout">
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