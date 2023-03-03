<script setup lang="ts">
import { useToggle } from '@zdzz/hooks';
import { ref } from 'vue';
const [state, toggle] = useToggle(true);
</script>

<template>
  <div>
    <h2>useToggle</h2>
    <button @click="toggle()">
      {{ state }}
    </button>
  </div>
</template>

<style scoped>

</style>