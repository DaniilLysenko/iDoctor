import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pharmacy from '@/components/pharmacy/Pharmacy'
import Registration from '@/components/user/Registration'

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
      component: Registration
    }
  ]
})
