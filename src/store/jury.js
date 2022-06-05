import rootState from "../store/fac/state";
import Deliberation from "../apis/Deliberation";
import Toast from "./alert";

export default {
  state: {
    postToJury: {},
    deliberations: [],
    selectedDeliberation: {},
    deliberationCotes: [],
  },

  mutations: {
    SET_DELIBERATIONS(state, datas) {
      state.deliberations = [];
      datas.forEach((element) => {
        state.deliberations.push(element);
      });
    },

    SET_SELECTED_DELIBERATION(state, id) {
      state.deliberations.find((delib) => delib.id === id);
    },

    SET_DELIBERATION_COTES(state, id) {
      state.deliberations.find((delib) => delib.id === id);
    },
  },

  getters: {
    postToJury: (state) => (datas) => {
      rootState.jury.members.forEach((member) => {
        if (member.id === datas.professor_id) {
          return {
            is_member: true,
            role: memner.role,
          };
        }
        return {
          is_member: false,
        };
      });
    },

    deliberationCotes(state) {
      return state.deliberationCotes;
    },

    deliberations(state) {
      return state.deliberations;
    },

    selectedDeliberation(state) {
      return state.selectedDeliberation;
    },
  },

  actions: {
    getDeliberations(store, promotion_id) {
      Deliberation.all(promotion_id).then((response) => {
        store.commit("SET_DELIBERATIONS", response.data);
      });
    },

    publishDeliberation(store, deliberation_id) {
      Deliberation.publish(deliberation_id)
        .then((response) => {
          store.commit("SET_DELIBERATIONS", response.data.deliberations);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteDeliberation(store, deliberation_id) {
      Deliberation.delete(deliberation_id)
        .then((response) => {
          store.commit("SET_DELIBERATIONS", response.data.deliberations);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    newDeliberation(store, values) {
      Deliberation.add(values)
        .then((response) => {
          store.commit("SET_DELIBERATIONS", response.data.deliberations);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDeliberationCotes(store, values) {
      Deliberation.getCotes(values);
    },

    editselectedDeliberation(store, id) {
      store.commit("SET_SELECTED_DELIBERATION", id);
    },
  },
};
