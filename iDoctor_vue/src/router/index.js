import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pharmacy from '@/components/pharmacy/Pharmacy'

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
      path: '/pharm',
      name: 'Pharmacy',
      component: Pharmacy      
    }
  ]
})
