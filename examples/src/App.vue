<script setup lang="ts">
import { getCodeImg } from './api/login';
import DefaultLayout from './layout/default.vue';
getCodeImg();
</script>

<template>
  <DefaultLayout />
</template>

<style scoped>

</style>
