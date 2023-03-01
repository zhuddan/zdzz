<script setup lang="ts">
import { useToggle } from '@zdzz/hooks';
import { ref, toRefs } from 'vue';
const [state, toggle] = useToggle();
console.log(state);
const tt = ref(false);
console.log(tt);
function ssss() {

}
</script>

<template>
  <div>
    <button @click="() => toggle()">
      {{ state }}
    </button>
    <button>
      {{ tt }}
    </button>
  </div>
</template>

<style scoped>

</style>