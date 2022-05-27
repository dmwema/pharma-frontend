export default {
  mutations: {
    STOP_LOADER(state) {
      state.loading = false;
    },
    SHOW_LOADER(state) {
      state.loading = true;
    },
  },

  getters: {
    isLoading(state) {
      return state.loading;
    },
  },

  actions: {
    stopLoader(store) {
      store.commit("STOP_LOADER");
    },
    showLoader(store) {
      store.commit("SHOW_LOADER");
    },
  },

  state: {
    loading: false,
  },
};
