import auth from "../store/auth";

import Api from "./Api";

export default {
  all(promotion_id) {
    return Api.get("deliberations/1", {
      promotion_id: promotion_id,
    });
  },

  add(data) {
    console.log(data);
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

  result(deliberation_id) {
    return Api.get("delib-result/" + deliberation_id, {
      deliberation_id: deliberation_id,
    });
  },

  getCotes(data) {
    return data;
  },
};
