import Api from "./Api";

export default {
  all() {
    return Api.get("student");
  },

  update(student) {
    return Api.post("/update-student", {
      id: student.id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      gender: student.sexe,
    });
  },

  delete(id) {
    return Api.post("delete-student", { id: id });
  },

  add(data) {
    return Api.post("/add-student", {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      gender: data.sexe,
    });
  },
};
