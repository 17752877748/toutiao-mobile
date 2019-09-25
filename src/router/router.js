import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login/'
import home from '../views/home/'
import notLogged from '../views/notLogged/'
import loggedIn from '../views/loggedIn/'
import tabbar from '../views/tabbar_layout/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: login },
    {
      path: '', component: tabbar, children: [
        { path: '', redirect: '/home' },
        { path: '/home', component: home, name: 'home' },
        { path: '/notLogged', component: notLogged, name: 'notLogged' },
        { path: '/loggedIn', component: loggedIn, name: 'loggedIn' }
      ]
    },


  ]
})
