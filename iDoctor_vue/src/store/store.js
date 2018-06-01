import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: '', isAuth: false
    },
    mutations: {
        setJwt(state, token) {
            state.jwt = token;
        },
        setAuth(state, val) {
            state.isAuth = val;
        }
    },
    plugins: [createPersistedState()]
})