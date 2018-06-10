import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pharmacy from '@/components/pharmacy/Pharmacy'
import Registration from '@/components/user/Registration'
import Login from '@/components/user/Login'
import Profile from '@/components/user/Profile'
import Card from '@/components/card/Card'
import Simptom from '@/components/simptom/Simptom'
import AdminPanel from '@/components/admin/AdminPanel'
import DoctorCreate from '@/components/doctor/DoctorCreate'
import mdlw from '../middleware/mdlw.js'

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
      beforeEnter: mdlw.redirectIfAuth
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: mdlw.redirectIfAuth
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
      beforeEnter: mdlw.checkAuth
    },
    {
      path: '/card',
      name: 'Card',
      component: Card,
      beforeEnter: mdlw.checkAuth     
    },
    {
      path: '/admin/panel',
      name: 'AdminPanel',
      component: AdminPanel,
      beforeEnter: mdlw.checkAdmin
    },
    {
      path: '/doctor/create',
      name: 'DoctorCreate',
      component: DoctorCreate,
      beforeEnter: mdlw.redirectIfAuth
    }
  ]
})
