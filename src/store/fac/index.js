import Vue from "vue";
import Vuex from "vuex";
import auth from "../auth";
import loader from "../loader";
import prof from "../prof";
import juryStore from "../jury";

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
  modules: { auth, loader, prof, juryStore },
});

global.store = store;

export default store;
