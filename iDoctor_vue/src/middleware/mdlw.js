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
    }
}