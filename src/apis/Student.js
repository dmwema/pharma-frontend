import Api from "./Api";

export default {
  all() {
    return Api.get("students/1");
  },

  update(student) {
    return Api.post("/update-student", {
      id: student.id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      gender: student.sexe,
      promotion_id: 1,
    });
  },

  delete(id) {
    return Api.post("delete-student", { id: id, promotion_id: 1 });
  },

  add(data) {
    return Api.post("/add-student", {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      sexe: data.sexe,
      promotion_id: 1,
    });
  },
};
