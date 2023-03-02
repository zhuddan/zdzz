<script setup lang="ts">
import { useToggle } from '@zdzz/hooks';
import { ref } from 'vue';
import UseToggle from './useToggle.vue';
import UseRouteQuery from './useRouteQuery.vue';
</script>

<template>
  <div>
    <h1>hooks</h1>
    <ul>
      <li>
        <UseToggle />
        <UseRouteQuery />
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>