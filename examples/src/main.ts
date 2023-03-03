import './style.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { installStore } from './store';

function __init__() {
  const app = createApp(App);
  installStore(app);
  setupRouter(app);
  app.mount('#app');
}

__init__();