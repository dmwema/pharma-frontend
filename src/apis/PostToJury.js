import Api from "./Api";

export default {
  get(promotion_id, professor_id) {
    return Api.get("post-jury/" + promotion_id + "/" + professor_id);
  },
};
