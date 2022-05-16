export const addProf = (store, prof) => {
    store.commit('ADD_PROF', prof)
}

export const editProf = (store, prof) => {
    store.commit('EDIT_PROF', prof)
}

export const deleteProf = (store, id) => {
    store.commit('DELETE_PROF', id)
}

export const editSelectedProf = (store, id) => {
    store.commit('EDIT_SELECTED_PROF', id)
}