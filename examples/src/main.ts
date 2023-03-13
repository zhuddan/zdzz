import './style.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { installStore } from './store';
// import zC from '@zdzz/components';
import 'virtual:svg-icons-register';

function __init__() {
  const app = createApp(App);
  installStore(app);
  setupRouter(app);
  app.mount('#app');
  // app.use(zC);
}

__init__();