import store from '../store/store.js'

export default {
    redirectIfAuth: (to, from, next) => {
        if (store.state.isAuth != false) {
            next('/profile');
        } else {
            next();
        }
    },
    checkUser: (to, from, next) => {
        if (store.state.isAuth != false && store.state.type == 'user') {
            next();
        } else {
            next('/login');
        }
    },
    checkCardOwner: (to, from, next) => {
        if (store.state.isAuth != false) {
            next();
        } else {
            next('/login');
        }
    },
    checkAdmin: (to, from, next) => {
        if (store.state.isAuth === true) {
            if (store.state.type == 'admin') {
                next();
            } else {
                next('/');
            }
        } else {
            next('/login');
        }
    },
    checkDoctor: (to, from, next) => {
        if (store.state.isAuth != false && store.state.type == 'doctor') {
            next();
        } else {
            next('/login');
        }      
    }
}