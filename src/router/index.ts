import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Random from '../views/Random.vue'
import Categories from '../views/Categories.vue'
import Details from '../views/Details.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/random',
    name: 'Random',
    component: Random
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
