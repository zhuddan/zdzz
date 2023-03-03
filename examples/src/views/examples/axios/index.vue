<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/cache';
import Login from './Login.vue';
const userStore = useUserStore();
const token = getToken();
if (token) userStore.getInfo();
</script>

<template>
  <div>
    <Login v-if="!userStore.isLogin" />
    <p v-else>
      you are already logged in <button @click="userStore.logout">
        logout
      </button>
    </p>
  </div>
</template>

<style scoped>

</style>