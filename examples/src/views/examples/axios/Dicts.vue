<script setup lang="ts">
import { useDicts } from '@/hooks/useDicts';
import { computed } from 'vue';

const a = [
  {
    label: '一',
    value: 1,
  },
  {
    label: '二',
    value: 2,
  },
];
const { sys_user_sex, format } = useDicts(['sys_user_sex']);
const res = computed(() => format(a, [1, 2], { isRaw: true }));
const res2 = computed(() => format(sys_user_sex, [1, 2]));
</script>

<template>
  <div>
    <p>
      {{ sys_user_sex.map(e => e.value) }}
    </p>
    <p>
      {{ res }}<br>
      {{ res2 }}
    </p>
  </div>
</template>

<style scoped>

</style>