import auth from "../store/auth";

import Api from "./Api";

export default {
  all() {
    return Api.get("courses/1");
  },

  update(course) {
    return Api.post("/update-course", {
      id: course.id,
      title: course.title,
      ponderation: course.ponderation,
      professor: course.professor,
    });
  },

  add(data) {
    return Api.post("/add-course", {
      title: data.title,
      ponderation: data.ponderation,
      middlename: data.middlename,
      current_prof_id: data.professor_id,
      current_promotion_id: data.promotion_id,
    });
  },

  delete(id) {
    return Api.post("delete-course", { id: id });
  },

  getProfCourses() {
    let prof_id = auth.state.user.professor.id;
    return Api.get("teacher/courses/" + prof_id, { teacher_id: prof_id });
  },
};
