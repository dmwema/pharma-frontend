export default {
  professors: [],

  students: [],

  api_url: "http://localhost:8000/api/",

  courses: [],

  students: [],

  validProfLink: false,

  promotions: [],

  selectedPromotion: null,

  selectedProf: {
    id: "",
    key: "",
    fullname: "",
    email: "",
    sexe: "",
  },

  selectedLoginProf: {
    fullname: "",
  },

  selectedStudent: {
    id: "",
    key: "",
    fullname: "",
    email: "",
    sexe: "",
  },

  selectedCourse: {
    id: "",
    key: "",
    title: "",
    ponderation: "",
    professor_id: "",
    promotion_id: "",
  },
  jury: {
    jury: "",
    members: [],
  },
};
