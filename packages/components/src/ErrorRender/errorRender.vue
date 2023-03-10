<script lang="ts" setup>
import { onMounted, useSlots } from 'vue';
import { Icon } from '../Icon';
// import error_svg from '../assets/icons/error.svg';
defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
  errorMsg: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['refresh']);
defineOptions({
  name: 'ErrorRender',
});
const slots = useSlots();
onMounted(() => {
  console.log(slots);
});
</script>

<template>
  <div v-if="isError" class="error-render">
    <div v-if="slots?.error">
      <slot name="error"></slot>
    </div>

    <template v-else>
      <Icon icon="ep:circle-close-filled" />
      <p>
        {{ errorMsg }}
      </p>
    </template>
    <div v-if="slots['refresh-btn']">
      <slot name="refresh-btn"></slot>
    </div>
    <button v-else class="refresh-btn" @click="emit('refresh')">
      刷新
    </button>
  </div>
</template>

