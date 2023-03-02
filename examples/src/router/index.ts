import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
export const menus: RouteRecordRaw[] = [
  {
    path: 'is',
    component: () => import('../views/examples/is.vue'),
  },
  {
    path: 'cache',
    component: () => import('../views/examples/cache.vue'),
  },
  {
    path: 'hooks',
    component: () => import('../views/examples/hooks/index.vue'),
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/examples',
      redirect: '/examples/is',
      children: menus,
    },
  ],
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
