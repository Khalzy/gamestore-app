import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Random from '../views/Random.vue'
import Categories from '../views/Categories.vue'
import useFetch from '../Hooks/useFetch.vue'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
