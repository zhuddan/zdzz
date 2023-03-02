<script setup lang="ts">
import { useRouteQuery } from '@zdzz/hooks';
const state = useRouteQuery('id');
</script>

<template>
  <div>
    <h2>useRouteQuery</h2>
    <input v-model="state" type="text">
  </div>
</template>

<style scoped>

</style>