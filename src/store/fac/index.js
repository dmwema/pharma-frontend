import Vue from "vue";
import Vuex from "vuex";
import auth from "../auth";
import loader from "../loader";

Vue.use(Vuex);

import state from "./state";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: true,
  modules: { auth, loader },
});

global.store = store;

export default store;
