import store from '../store/store.js'
export default {
    redirectIfAuth: (to, from, next) => {
        if (store.state.isAuth != false) {
            next('/profile');
        } else {
            next();
        }
    },
    checkAuth: (to, from, next) => {
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
    }
}