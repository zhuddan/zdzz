<script setup lang="ts">
import { useSlots } from 'vue';

defineProps({
  text: {
    type: String,
    default: '加载中...',
  },
});
const slots = useSlots();
</script>

<template>
  <div class="loading-container">
    <svg class="loading-circular" viewBox="0 0 50 50"><circle class="loading-path" cx="25" cy="25" r="20" fill="none" /></svg>
    <slot v-if="slots.default"></slot>
    <p v-else class="loading-text">
      {{ text }}
    </p>
  </div>
</template>
