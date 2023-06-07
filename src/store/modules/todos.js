const state = {
  items: [],
  activeItem: null,
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items.map(item => ({ title: item, status: 'pending' }));
  },
  ADD_ITEM(state, newItem) {
    state.items.push({ title: newItem, status: 'pending' });
  },
  REMOVE_ITEM(state, index) {
    state.items.splice(index, 1);
  },
  UPDATE_ITEM(state, { index, editedItem }) {
    state.items[index].title = editedItem;
  },
  UPDATE_ITEM_STATUS(state, { index, status }) {
    state.items[index].status = status;
  },
  SET_ACTIVE_ITEM(state, index) {
    state.activeItem = index;
  },
};

const actions = {
  fetchItems({ commit }) {
    setTimeout(() => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      commit('SET_ITEMS', items);
    }, 500);
  },
  addItem({ commit, state }, newItem) {
    setTimeout(() => {
      commit('ADD_ITEM', newItem);
      const index = state.items.length - 1;
      commit('SET_ACTIVE_ITEM', index);
    }, 500);
  },
  removeItem({ commit, state }, index) {
    setTimeout(() => {
      commit('REMOVE_ITEM', index);
      if (state.activeItem === index) {
        commit('SET_ACTIVE_ITEM', null);
      }
    }, 500);
  },
  updateItem({ commit }, { index, editedItem }) {
    commit('UPDATE_ITEM', { index, editedItem });
  },
  selectItem({ commit }, index) {
    commit('SET_ACTIVE_ITEM', index);
  },
  saveItem({ commit }, { index, editedItem }) {
    commit('UPDATE_ITEM', { index, editedItem });
    commit('SET_ACTIVE_ITEM', null);
  },
  updateItemStatus({ commit }, { index, status }) {
    commit('UPDATE_ITEM_STATUS', { index, status });
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
    return state.items[id];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
