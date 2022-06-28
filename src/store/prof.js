import Course from "../apis/Course";
import Test from "../apis/Test";
import Toast from "./alert";
import Cote from "../apis/Cote";

export default {
  state: {
    courses: [],
    tests: [],
    ratings: [],
    selectedCourse: null,
    cotes: [],
  },

  mutations: {
    SET_COURSES(state, data) {
      let i = 0;
      let stateData = [];
      data.forEach((element) => {
        stateData.push({
          id: ++i,
          key: element.id,
          title: element.title,
          ponderation: element.ponderation,
        });
      });
      state.courses = stateData;
    },
    SET_TESTS(state, data) {
      state.tests = [];
      let i = 0;
      let stateData = [];
      data.forEach((element) => {
        let stateElem = [];
        element.annual_works.forEach((work) => {
          stateElem.push({
            id: work.id,
            key: ++i,
            title: work.title,
            description: work.description,
            created_at: work.created_at,
            date_work: work.date_work,
            max: work.max,
            students: work.students,
          });
        });
        stateData.push({
          id: element.id,
          key: element.id,
          title: element.title,
          annual_works: stateElem,
          course_delib: element.course_delib,
        });
      });
      state.tests = stateData;
    },
    EDIT_SELECTED_COURSE(state, id) {
      state.selectedCourse = id;
    },
    SET_COTES(state, cotes) {
      let stateCotes = [];
      stateCotes.forEach((cote) => {
        stateCotes.push({
          id: cote.id,
          student_id: cote.student_id,
          work_id: cote.work_id,
          cote: cote.cote,
          edited: cote.edited,
        });
      });
      state.cotes = cotes;
    },
  },

  getters: {
    getCourses(state) {
      return state.courses;
    },

    tests(state) {
      return state.tests;
    },

    profSelectedCourse(state) {
      return state.selectedCourse;
    },

    cotes(state) {
      return state.cotes;
    },

    coteObj(state) {
      let ret = [];
      state.cotes.forEach((cote) => {
        ret[cote.id] = cote.cote;
      });
      return ret;
    },

    getSingleCote: (state) => (id) => {
      return state.cotes.find((row) => row.id === id).cote;
    },
  },

  actions: {
    profCourses(store) {
      Course.getProfCourses().then((response) => {
        store.commit("SET_COURSES", response.data);
      });
    },
    profTests(store, with_cotes = 0) {
      Test.all(with_cotes)
        .then((response) => {
          store.commit("SET_TESTS", response.data.courses);
          store.commit("EDIT_SELECTED_COURSE", response.data.courses[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTest(store, data) {
      Test.add(data)
        .then((response) => {
          if (response.data.success) {
            store.commit("SET_TESTS", response.data.courses);
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
          } else {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTest(state, id) {
      Test.delete(id)
        .then((response) => {
          if (response.data.success) {
            store.commit("SET_TESTS", response.data.courses);
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
          } else {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editSelectedCourse(store, id) {
      store.commit("EDIT_SELECTED_COURSE", id);
    },
    getCotes(store) {
      Cote.all()
        .then((response) => {
          store.commit("SET_COTES", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCote(state, data) {
      Cote.store(data)
        .then((response) => {
          store.commit("SET_COTES", response.data.cotes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCotes(state, data) {
      return Cote.update(data);
    },
  },
};
