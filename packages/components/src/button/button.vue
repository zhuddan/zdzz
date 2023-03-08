<script setup lang="ts">
import { buttonProps } from './button';

const props = defineProps(buttonProps);

defineOptions({
  name: 'VButton',
});
</script>

<template>
  <button :class="[props.type]">
    this button is VButton
  </button>
</template>

<style scoped>

</style>