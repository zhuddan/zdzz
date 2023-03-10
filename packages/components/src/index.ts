import components from './components';
export * from './components';
import type { App } from 'vue';
export default {
  install: (app: App) => {
    components.forEach(c => app.use(c));
  },
};
