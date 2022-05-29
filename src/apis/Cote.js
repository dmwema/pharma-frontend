import auth from "../store/auth";

import Api from "./Api";

export default {
  all() {
    return Api.get("cotes/1", { promotion_id: 1 });
  },

  update(data) {
    return Api.post("/update-cote", {
      cote: data.cote,
    });
  },

  add(data) {
    return Api.post("/add-cote", {
      cote: data.cote,
      work_id: data.work_id,
      student_id: data.student_id,
    });
  },

  delete(id) {
    return Api.post("delete-cote", { id: id });
  },
};
