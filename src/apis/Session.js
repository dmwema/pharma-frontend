import Api from "./Api";

export default {
  all(promo) {
    return Api.get("sessions/1", {
      promotion_id: promo,
    });
  },

  add(data) {
    return Api.post("/add-session", {
      title: data.title,
      promotion_id: data.promotion_id,
      start: data.start,
      end: data.end,
    });
  },

  delete(data) {
    return Api.post("/delete-session", {
      session_id: data.session_id,
      promotion_id: data.promotion_id,
    });
  },
};
