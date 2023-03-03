<script setup lang="ts">
import { useToggle } from '@zdzz/hooks';
import { ref } from 'vue';
import HooksUseToggle from './HooksUseToggle.vue';
import HooksUseRouteQuery from './HooksUseRouteQuery.vue';
</script>

<template>
  <div>
    <h1>hooks</h1>
    <ul>
      <li>
        <HooksUseToggle />
        <HooksUseRouteQuery />
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>