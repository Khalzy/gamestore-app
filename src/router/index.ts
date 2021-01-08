import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
function loadView (view: string) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: '/random',
    name: 'Random',
    component: loadView('RandomData')
  },
  {
    path: '/details/:id',
    name: 'details',
    component: loadView('Details')
  },
  {
    path: '/:id/:platform',
    name: 'platforms',
    component: loadView('Platforms')
  },
  {
    path: '/genre/:genreId/:name',
    name: 'genre',
    component: loadView('Home')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
