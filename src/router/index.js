import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'
import Detail from '../views/Detail.vue'
import Favorite from '../views/Favorite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
