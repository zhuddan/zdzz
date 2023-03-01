<script setup lang="ts">
import { menus } from '../router';

menus;
</script>

<template>
  <aside>
    <router-link v-for="(item, index) in menus" :key="index" class="menu-nav" :to="item.path">
      {{ item.meta?.name || item.path }}
    </router-link>
  </aside>
</template>

<style scoped lang="scss">
aside{
  border-right: 1px solid #ccc;
  width: var(--app-aside-width);
  box-sizing: border-box;
}

.menu-nav{
  display: block;
  color: #ccc;
  text-decoration: none;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;

  &.router-link-exact-active{
    background-color: var(--color-primary);
    color: #fff;
    border-color: var(--color-primary);
  }
}
</style>