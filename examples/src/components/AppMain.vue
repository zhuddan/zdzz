<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppAside from './AppAside.vue';
const route = useRoute();
const isHome = computed(() => route.path === '/');
</script>

<template>
  <main :class="{ has_nav: !isHome }">
    <div
      class="container"
    >
      <router-view v-if="isHome" />
      <div v-else class="view">
        <AppAside />
        <div style="padding-left: 10px">
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main{
    margin-top: var(--app-header-height);
    padding: var(--app-main-padding) 0;
    flex: 1
  }

  .view{
    padding: 10px;
    background: #fff;
    min-height: var(--app-page-height);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: var(--app-aside-width) 1fr;
  }
</style>