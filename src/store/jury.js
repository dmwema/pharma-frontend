import rootState from "../store/fac/state";
import Deliberation from "../apis/Deliberation";
import Toast from "./alert";
import Session from "../apis/Session";
import Schedule from "../apis/Schedule";
import ProfStore from "./prof";
import Course from "../apis/Course";

export default {
  state: {
    postToJury: {},
    deliberations: [],
    cotes_state: [],
    selectedDeliberation: {},
    selectedSession: {},
    deliberationCotes: [],
    sessions: [],
    cotesSent: [],
    results: [],
  },

  mutations: {
    SET_DELIBERATIONS(state, datas) {
      state.deliberations = [];
      datas.forEach((element) => {
        state.deliberations.push(element);
      });
    },

    SET_RESULTS(state, data) {
      let i = 0;
      state.results = [];
      data.forEach((element) => {
        let decision;
        if (element.delib.decisions == 1) {
          decision = "D";
        } else if (element.delib.decisions == 2) {
          decision = "S";
        } else if (element.delib.decisions == 3) {
          decision = "A";
        } else if (element.delib.decisions == 4) {
          decision = "NAF";
        }
        console.log(element);
        state.results.push({
          key: ++i,
          id: element.student.id,
          fullname:
            element.student.lastname +
            " " +
            element.student.middlename +
            " " +
            element.student.firstname +
            " (" +
            element.student.gender +
            ")",
          legers: element.delib.legers,
          graves: element.delib.graves,
          nulls: element.delib.nulls,
          pourc: element.delib.pourc,
          dec: decision,
        });
      });
    },

    SET_SELECTED_DELIBERATION(state, id) {
      state.deliberations.find((delib) => delib.id === id);
      state.selectedDeliberation = id;
    },

    SET_SELECTED_SESSION(state, id) {
      state.selectedSession = state.sessions.find(
        (session) => session.id === id
      );
    },

    SET_DELIBERATION_COTES(state, id) {
      state.deliberations.find((delib) => delib.id === id);
    },

    SET_SESSIONS(state, datas) {
      state.sessions = [];
      datas.forEach((session) => {
        state.sessions.push(session);
      });
    },
    REMOVE_SCHEDULE: (state, data) => {
      let i = state.selectedSession.schedules
        .map((item) => item.id)
        .indexOf(data.id);
      state.selectedSession.schedules.splice(i, 1);
    },
    ADD_SCHEDULE: (state, data) => {
      state.selectedSession.schedules.push(data);
    },

    COTES_SENT(state, data) {
      state.cotesSent[data.session_id] = {
        course: data.course_id,
        sent: true,
      };
      console.log(state);
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

    sessions(state) {
      return state.sessions;
    },

    getSelectedSession(state) {
      return state.selectedSession;
    },

    getCotesSent(state) {
      return state.cotesSent;
    },

    results(state) {
      return state.results;
    },
  },

  actions: {
    getDeliberations(store, promotion_id) {
      Deliberation.all(promotion_id).then((response) => {
        store.commit("SET_DELIBERATIONS", response.data);
      });
    },

    getResult(store, deliberation_id) {
      Deliberation.result(deliberation_id).then((response) => {
        store.commit("SET_RESULTS", response.data);
      });
    },

    addSession(state, data) {
      Session.add(data)
        .then((response) => {
          store.commit("SET_SESSIONS", response.data.sessions);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addSchedule(state, data) {
      Schedule.add(data)
        .then((response) => {
          if (response.data.success == true) {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            store.commit("ADD_SCHEDULE", response.data.schedule);
          } else {
            Toast.fire({
              icon: "warning",
              title: response.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
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

    deleteSession(store, data) {
      Session.delete(data)
        .then((response) => {
          store.commit("SET_SESSIONS", response.data.sessions);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteSchedule(store, data) {
      Schedule.delete(data)
        .then((response) => {
          if (response.data.success === true) {
            console.log(response.data.message);
            store.commit("REMOVE_SCHEDULE", data);
          }
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

    getSessions(store, promotion_id) {
      Session.all(promotion_id)
        .then((response) => {
          store.commit("SET_SESSIONS", response.data.sessions);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editselectedDeliberation(store, id) {
      store.commit("SET_SELECTED_DELIBERATION", id);
    },

    editSelectedSession(store, id) {
      store.commit("SET_SELECTED_SESSION", id);
    },

    getAllCourseCotes(store, data) {
      return Course.allCotes(data);
    },

    sendCotes(store, data) {
      Session.sendCotes(data)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            store.commit("COTES_SENT", data);
            store.dispatch("profTests");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
