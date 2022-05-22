import Api from "./Api";

export default {
  all() {
    return Api.get("professor");
  },

  update(prof) {
    return Api.post("/update-professor", {
      id: prof.id,
      firstname: prof.firstname,
      lastname: prof.lastname,
      middlename: prof.middlename,
      email: prof.email,
      sexe: prof.gender,
    });
  },

  delete(id) {
    return Api.post("delete-professor", { id: id });
  },

  add(data) {
    return Api.post("/add-professor", {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      sexe: data.sexe,
    });
  },
};
