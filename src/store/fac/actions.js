import axios from "axios";
import Toast from "../alert";
import state from "../fac/state";
import Professor from "../../apis/Professor";
import Department from "../../apis/Department";
import Course from "../../apis/Course";
import Jury from "../../apis/Jury";
import Student from "../../apis/Student";

export const getProfs = (store) => {
  Professor.all()
    .then(function (response) {
      store.commit("SET_PROFS", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getPromotions = (store) => {
  Department.all()
    .then(function (response) {
      store.commit("GET_PROMOTIONS", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addProf = (store, prof) => {
  Professor.add(prof)
    .then(function (response) {
      if (response.data.success) {
        store.commit("ADD_PROF", prof);
        store.commit("SET_PROFS", response.data.profs);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editProf = (store, prof) => {
  Professor.update(prof)
    .then(function (response) {
      console.log(response);
      if (response.data.success) {
        store.commit("EDIT_PROF", prof);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteProf = (store, id) => {
  Professor.delete(id)
    .then(function (response) {
      if (response.data.success) store.commit("DELETE_PROF", id);
      store.commit("SET_PROFS", response.data.profs);
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editSelectedProf = (store, id) => {
  store.commit("EDIT_SELECTED_PROF", id);
};

// courses

export const getCourses = (store) => {
  Course.all()
    .then(function (response) {
      store.commit("GET_COURSES", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editSelectedCourse = (store, id) => {
  store.commit("EDIT_SELECTED_COURSE", id);
};

export const addCourse = (store, course) => {
  Course.add(course)
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        store.commit("GET_COURSES", response.data.courses);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCourse = (store, id) => {
  Course.delete(id)
    .then(function (response) {
      if (response.data.success) {
        store.commit("GET_COURSES", response.data.courses);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editCourse = (store, course) => {
  Course.update(course)
    .then(function (response) {
      if (response.data.success) {
        store.commit("GET_COURSES", response.data.courses);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// JURY

export const getJury = (store) => {
  Jury.all()
    .then(function (response) {
      store.commit("GET_JURY", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const jury_addProf = (store, prof) => {
  Jury.add(prof)
    .then(function (response) {
      if (response.data.success) {
        store.commit("ADD_PROF", prof);
        store.commit("GET_JURY", response.data.jury);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const jury_deleteProf = (store, data) => {
  Jury.delete(data)
    .then(function (response) {
      if (response.data.success) {
        store.commit("GET_JURY", response.data.jury);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editJury = (store, jury) => {
  Jury.update(jury)
    .then(function (response) {
      console.log(response);
      if (response.data.success) {
        store.commit("GET_JURY", response.data.jury);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// STUDENTS

export const getStudents = (store) => {
  Student.all()
    .then(function (response) {
      store.commit("GET_STUDENTS", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addStudent = (store, student) => {
  Student.add(student)
    .then((response) => {
      if (response.data.success) {
        store.commit("GET_STUDENTS", response.data.students);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editStudent = (store, student) => {
  Student.update(student)
    .then(function (response) {
      if (response.data.success) {
        store.commit("GET_STUDENTS", response.data.students);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteStudent = (store, id) => {
  Student.delete(id)
    .then(function (response) {
      if (response.data.success) {
        store.commit("GET_STUDENTS", response.data.students);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editSelectedStudent = (store, id) => {
  store.commit("EDIT_SELECTED_STUDENT", id);
};

// LOGINS

export const checklink = (store, link) => {
  return axios({
    method: "post",
    url: state.api_url + "checklink",
    data: {
      link: link,
    },
  });
};

export const checkSecret = (store, data) => {
  return axios({
    method: "post",
    url: state.api_url + "check",
    data: {
      link: data.link,
      secret: data.code,
    },
  });
};

export const editCredentials = (store, data) => {
  return axios({
    method: "post",
    url: state.api_url + "edit-credentials",
    data: {
      email: data.email,
      password: data.password,
      link: data.link,
    },
  });
};
