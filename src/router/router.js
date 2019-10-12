import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login/'
import home from '../views/home/'
import notLogged from '../views/notLogged/'
import mine from '../views/mine/'
import tabbar from '../views/tabbar_layout/'
import search from '../views/search/'
import list from '../views/list/'
import artDetail from '../views/artDetail/'
import profile from '../views/profile/'
import xiaozhi from '../views/xiaozhi/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/list/:key', component: list, name: 'list' },
    { path: '/artDetail/:id', component: artDetail, name: 'artDetail' },
    { path: '/profile/', component: profile, name: 'profile' },
    { path: '/xiaozhi/', component: xiaozhi, name: 'xiaozhi' },
    {
      path: '', component: tabbar, children: [
        { path: '', redirect: '/home' },
        { path: '/home', component: home, name: 'home' },
        { path: '/notLogged', component: notLogged, name: 'notLogged' },
        { path: '/mine', component: mine, name: 'mine' },
        { path: '/search', component: search, name: 'search' },
      ]
    },


  ]
})
