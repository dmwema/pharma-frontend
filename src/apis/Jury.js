import Api from "./Api";

export default {
  all() {
    return Api.get("jury/1");
  },

  update(id) {
    return Api.post("/update-jury", {
      id: id,
      promotion: 1,
    });
  },

  add(data) {
    console.log(data);
    return Api.post("/add-jury-member", {
      jury: data.jury,
      professor: data.professor,
      role: data.role,
    });
  },

  delete(data) {
    return Api.post("delete-jury-member", {
      prof: data.prof,
      jury: data.jury,
      promotion: data.promotion,
    });
  },
};
