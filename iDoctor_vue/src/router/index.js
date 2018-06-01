import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pharmacy from '@/components/pharmacy/Pharmacy'
import Registration from '@/components/user/Registration'
import Login from '@/components/user/Login'
import Profile from '@/components/user/Profile'
import Simptom from '@/components/simptom/Simptom'
import store from '../store/store.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pharmacy',
      name: 'Pharmacy',
      component: Pharmacy      
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      beforeEnter: (to, from, next) => {
        if (store.state.isAuth != false) {
          next('/profile');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.isAuth != false) {
          next('/profile');
        } else {
          next();
        }
      }
    },
    {
      path: '/simptom',
      name: 'Simptom',
      component: Simptom
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (store.state.isAuth != false) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
})
