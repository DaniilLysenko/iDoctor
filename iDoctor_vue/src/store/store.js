import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: '', isAuth: false, type: ''
    },
    mutations: {
        setJwt(state, token) {
            state.jwt = token;
        },
        setAuth(state, val) {
            state.isAuth = val;
        },
        setUserType(state, val) {
            state.type = val;
        }
    },
    plugins: [createPersistedState()]
})