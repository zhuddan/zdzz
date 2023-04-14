<script setup lang="ts">
import { getRawRecordRef } from '@zdzz/shared';
import { ref } from 'vue';

const s = {
  name: ref<'string' | 'a'>('a'),
  o: {
    a: ref(['KJK']),
  },
};

const ss = getRawRecordRef(s);
</script>

<template>
  <div class="page">
    <h1>just examples</h1>
    <p>
      <router-link to="/examples">
        examples
      </router-link>
    </p>
  </div>
</template>

<style scoped>

</style>