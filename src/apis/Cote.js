import auth from "../store/auth";

import Api from "./Api";

export default {
  all(work_id) {
    return Api.get("cotes/1", { promotion_id: 1, work_id: work_id });
  },

  update(data) {
    return Api.post("/update-cote", data);
  },
};
