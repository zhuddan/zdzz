<script setup lang="ts">
import { getRawRecordRef } from '../getRawRecordRef';
import { computed, ref } from 'vue';
const count = ref(0);
const c = computed(() => [count.value + 1, count.value + 1, count.value + 1]);
const s = {
  name: ref('s'),
  o: {
    a: ref<'string' | 'a'>('a'),
    c,
  },
};

const ss = getRawRecordRef(s);
console.log(ss);
ss.o.c;
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