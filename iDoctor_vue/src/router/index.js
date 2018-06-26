import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

// User components
import Registration from '@/components/user/Registration'
import Login from '@/components/user/Login'
import Profile from '@/components/user/Profile'

// Card components
import Card from '@/components/card/Card'

import Simptom from '@/components/simptom/Simptom'
import Pharmacy from '@/components/pharmacy/Pharmacy'

// Admin componets
import AdminPanel from '@/components/admin/AdminPanel'

// Doctor componnets
import DoctorCreate from '@/components/doctor/DoctorCreate'
import Cabinet from '@/components/doctor/Cabinet'

// Middleware
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
      beforeEnter: mdlw.checkUser
    },
    {
      path: '/card/:id',
      name: 'Card',
      component: Card,
      beforeEnter: mdlw.checkCardOwner     
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
    },
    {
      path: '/doctor/cabinet',
      name: 'Cabinet',
      component: Cabinet,
      beforeEnter: mdlw.checkDoctor
    }
  ]
})
