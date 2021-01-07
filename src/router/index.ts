import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Home = () => import(/* webpackChunkName: "group-foo" */ '../views/Home.vue')
const Random = () => import(/* webpackChunkName: "group-foo" */ '../views/Random.vue')
const Categories = () => import(/* webpackChunkName: "group-foo" */ '../views/Categories.vue')
const Details = () => import(/* webpackChunkName: "group-foo" */ '../views/Details.vue')
const Platforms = () => import(/* webpackChunkName: "group-foo" */ '../views/Platforms.vue')

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
  },
  {
    path: '/:id/:platform',
    name: 'platforms',
    component: Platforms
  },
  {
    path: '/genre/:genreId/:name',
    name: 'genre',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
