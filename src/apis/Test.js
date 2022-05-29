import auth from "../store/auth";
import { selectedCourse } from "../store/fac/getters";
import profStore from "../store/prof";

import Api from "./Api";

export default {
  all(with_cotes) {
    let prof_id = auth.state.user.professor.id;
    if (with_cotes) {
      return Api.get("teacher/works/with/" + prof_id, {
        teacher_id: prof_id,
      });
    } else {
      return Api.get("teacher/works/" + prof_id, {
        teacher_id: prof_id,
      });
    }
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
    let prof_id = auth.state.user.professor.id;
    return Api.post("/teacher/work", {
      title: data.title,
      description: data.description,
      date: data.date,
      max: data.max === undefined ? null : data.max,
      course_id: profStore.state.selectedCourse,
      teacher_id: prof_id,
      promotion_id: 1,
    });
  },

  delete(id) {
    let prof_id = auth.state.user.professor.id;
    return Api.post("/teacher/delete_work", { id: id, teacher_id: prof_id });
  },

  getProfCourses() {
    let prof_id = auth.state.user.professor.id;
    return Api.get("teacher/courses/" + prof_id, { teacher_id: prof_id });
  },
};
