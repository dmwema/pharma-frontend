export const ADD_PROF = (state, prof) => {
  let storeProf = {
    key: store.getters.profsCount + 1,
    id: store.getters.profsCount + 1,
    fullname: prof.lastname + " " + prof.middlename + " " + prof.firstname,
    email: prof.email,
    sexe: prof.sexe,
  };
  state.professors.push(storeProf);
};

export const SET_PROFS = (state, profs) => {
  state.professors = [];
  let i = 0;
  profs.forEach((prof) => {
    state.professors.push({
      key: ++i,
      id: prof.id,
      fullname: prof.lastname + " " + prof.middlename + " " + prof.firstname,
      sexe: prof.gender,
      email: prof.email,
      has_logins: prof.has_logins,
    });
  });
};

export const GET_PROMOTIONS = (state, deps) => {
  state.promotions = [];
  let i = 0;
  deps.forEach((dep) => {
    dep.promotions.forEach((promo) => {
      state.promotions.push({
        key: ++i,
        id: promo.id,
        name: promo.name_promo + " " + dep.department,
      });
    });
  });
};

export const DELETE_PROF = (state, id) => {
  let index = state.professors.findIndex((prof) => prof.id == id);
  state.professors.splice(index, 1);
};

export const EDIT_PROF = (state, prof) => {
  const found = state.professors.find((item) => item.id === prof.id);

  found.fullname = prof.lastname + " " + prof.middlename + " " + prof.firstname;
  found.email = prof.email;
  found.sexe = prof.sexe;
};

export const EDIT_SELECTED_PROF = (state, id) => {
  state.selectedProf = state.professors.find((prof) => prof.id === id);
};

export const EDIT_SELECTED_LOGIN_PROF = (state, prof) => {
  state.selectedLoginProf = {
    fullname: prof.lastname + " " + prof.middlename + " " + prof.firstname,
  };
};

// COURSE

export const GET_COURSES = (state, courses) => {
  state.courses = [];
  let i = 0;
  courses.forEach((course) => {
    state.courses.push({
      key: ++i,
      id: course.id,
      title: course.title,
      ponderation: course.ponderation,
      professor: course.professor,
      professor_id: course.professor_id,
      promotion_id: course.promotion_id,
      professors: course.professors,
    });
  });
};

export const EDIT_SELECTED_COURSE = (state, id) => {
  state.selectedCourse = state.courses.find((course) => course.id === id);
};

//JURY

export const GET_JURY = (state, jury) => {
  let storeJury = {
    title: "",
    id: "",
    status: "",
    members: [],
  };

  state.jury = [];

  let roles = ["Président", "Secrétaire", "Membre"];

  let i = 0;

  storeJury.title = jury.jury.title;
  storeJury.status = jury.jury.status;
  storeJury.id = jury.jury.id;
  storeJury.promotion = jury.jury.promotion_id;
  storeJury.id = jury.jury.id;

  jury.members.forEach((member) => {
    storeJury.members.push({
      id: member.id,
      key: ++i,
      fullname:
        member.lastname + " " + member.middlename + " " + member.firstname,
      role: roles[member.role - 1],
    });
  });

  state.jury = storeJury;
};

// STUDENT

export const ADD_STUDENT = (state, student) => {
  let storeStudent = {
    fullname:
      student.lastname + " " + student.middlename + " " + student.firstname,
    email: student.email,
    sexe: student.sexe,
  };
  state.professors.push(storeProf);
};

export const GET_STUDENTS = (state, students) => {
  state.students = [];
  let i = 0;
  students.forEach((student) => {
    state.students.push({
      key: ++i,
      id: student.id,
      fullname:
        student.lastname + " " + student.middlename + " " + student.firstname,
      sexe: student.gender,
      email: student.email,
      has_logins: student.has_logins,
    });
  });
};

export const EDIT_SELECTED_STUDENT = (state, id) => {
  state.selectedStudent = state.students.find((student) => student.id === id);
};

export const VALID_LINK = (state) => {
  state.validProfLink = true;
};

export const UNVALID_LINK = (state) => {
  state.validProfLink = false;
};
