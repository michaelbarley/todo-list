import { createApp } from 'vue';
import { createStore } from 'vuex';
import todos from './modules/todos';

const store = createStore({
  modules: {
    todos
  },
});

const app = createApp({ })
app.use(store)
app.mount('#app')

export default store;
