<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/cache';
import Dicts from './Dicts.vue';
import Login from './Login.vue';

const userStore = useUserStore();
const token = getToken();
if (token) userStore.getInfo();
</script>

<template>
  <div>
    <Login v-if="!userStore.isLogin" />
    <div v-else>
      <p>
        you are already logged in <button @click="userStore.logout">
          logout
        </button>
      </p>
      <Dicts />
    </div>
  </div>
</template>

<style scoped>

</style>