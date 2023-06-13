import axios from 'axios';

axios.defaults.baseURL = 'http://todo-list-api.test';

const state = {
  items: [],
  activeItem: null,
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_ACTIVE_ITEM(state, item) {
    state.activeItem = item;
  },
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get('/api/items');
    commit('SET_ITEMS', response.data.data);
  },
  async addItem({ dispatch }, newItem) {
    await axios.post('/api/items', newItem);
    dispatch('fetchItems');
  },
  async removeItem({ commit, dispatch }, item) {
    await axios.delete(`/api/items/${item.id}`);
    commit('SET_ACTIVE_ITEM', null);
    dispatch('fetchItems');
  },
  async updateItem({ dispatch }, item) {
    await axios.put(`/api/items/${item.id}`, item);
    dispatch('fetchItems');
  },
  selectItem({ commit }, item) {
    commit('SET_ACTIVE_ITEM', item);
  },
  async saveItem({ dispatch }, item) {
    await axios.put(`/api/items/${item.id}`, item);
    dispatch('fetchItems');
  },
  async updateItemStatus({ dispatch }, item) {
    await axios.put(`/api/items/${item.id}`, item);
    dispatch('fetchItems');
  },

};

const getters = {
  totalItems(state) {
    return state.items.length;
  },
  activeItem(state) {
    return state.activeItem;
  },
  getItemById: (state) => (id) => {
    return state.items.find(item => item.id === id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
