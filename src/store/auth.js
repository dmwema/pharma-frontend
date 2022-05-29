import axios from "axios";
import rootState from "./fac/state";
import router from "../router";

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, user) {
      state.user = user;
    },
  },

  getters: {
    authentificated(state) {
      return state.user && state.token;
    },

    user(state) {
      return state.user;
    },
  },

  actions: {
    login(store, datas) {
      axios({
        method: "post",
        url: rootState.api_url + "auth/login",
        data: datas,
      })
        .then((response) => {
          store.dispatch("attempt", response.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async attempt(store, token) {
      if (token) {
        store.commit("SET_TOKEN", token);
      }

      if (!store.state.token) {
        return;
      }

      axios({
        method: "get",
        url: rootState.api_url + "auth/me",
      })
        .then((response) => {
          store.commit("SET_USER", response.data);
          if (router.currentRoute.name !== "DashboardsTeacher") {
            router.push({ name: "DashboardsTeacher" });
          }
        })
        .catch((err) => {
          console.log(err);
          store.commit("SET_USER", null);
          store.commit("SET_TOKEN", null);
        });
    },
  },
};
