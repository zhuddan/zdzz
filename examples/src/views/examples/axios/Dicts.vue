<script setup lang="ts">
import { useDicts } from '@/hooks/useDicts';
const { sys_user_sex, format } = useDicts(['sys_user_sex']);
</script>

<template>
  <div>
    <p>
      {{ sys_user_sex }}
    </p>
    <p>
      {{ format('sys_user_sex', [1, 0]) }}
    </p>
  </div>
</template>

<style scoped>

</style>