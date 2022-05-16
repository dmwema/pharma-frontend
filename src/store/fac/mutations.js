export const ADD_PROF = (state, prof) => {
    let storeProf = {
        key: store.getters.profsCount + 1,
        id: store.getters.profsCount + 1,
        fullname: prof.lastname + ' ' + prof.middlename + ' ' + prof.firstname,
        email: prof.email,
        sexe: prof.sexe
    }
    state.professors.push(storeProf)
}

export const DELETE_PROF = (state, id) => {
    let index = state.professors.findIndex(prof => prof.id == id);
    state.professors.splice(index, 1);
}

export const EDIT_PROF = (state, prof) => {
    const found = state.professors.find(item => item.id === prof.id);

    found.fullname = prof.lastname + ' ' + prof.middlename + ' ' + prof.firstname
    found.email = prof.email
    found.sexe = prof.sexe
}

export const EDIT_SELECTED_PROF = (state, id) => {
    state.selectedProf = state.professors.find(prof => prof.id === id)
}