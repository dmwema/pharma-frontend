import Vuex from 'vuex'

const state = {
    config: {
        apiURL: 'https://pharma-delib-api.herokuapp.com',
        loading: false
    },

    fac: {
        professors: [{
            fullname: "daniel mwema",
            email: "daniel@mwema.com",
            sexe: "M"
        }],
        courses: [],
        students: []
    }
}

const mutations = {
    ADD_PROF: (state, prof) => {
        state.fac.professors.push(prof)
    }
}

const actions = {
    addProf: (store, prof) => {
        store.commit('ADD_PROF', prof)
    },
    deleteProf: (store, prof) => {

    }
}

const getters = {
    profs: state => state.fac.professors
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true
})

global.store = store

export default store