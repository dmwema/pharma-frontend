import auth from "../store/auth";

import Api from "./Api";

export default {
  all(promotion_id) {
    return Api.get("deliberations/1", {
      promotion_id: 1,
    });
  },

  add(data) {
    return Api.post("/add-deliberation", data);
  },

  update(data) {
    return Api.post("/update-deliberation", data);
  },

  delete(deliberation_id) {
    return Api.post("/delete-deliberation", {
      deliberation_id: deliberation_id,
    });
  },

  publish(deliberation_id) {
    return Api.post("publish-deliberation", {
      deliberation_id: deliberation_id,
    });
  },

  getCotes(data) {
    return data;
  },
};
