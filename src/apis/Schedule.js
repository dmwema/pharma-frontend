import Api from "./Api";

export default {
  add(data) {
    return Api.post("/add-schedule", data);
  },

  delete(data) {
    return Api.post("/delete-schedule", {
      id: data.id,
    });
  },
};
