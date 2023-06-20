import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getCurrentUser } from 'vuefire'
//import Home from '../views/Home.vue'
//import store from '../store/'
//import { nextTick } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dash',
    component: () => import('../views/Dash.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  // {
  //   path: '/help',
  //   name: 'Help',
  //   component: () => import('../views/Help.vue'),
  //   meta: {
  //     layout: 'main',
  //     auth: true,
  //   },
  // },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      auth: false,
      layout: 'auth',
    },
  },
  //
  // {
  //   path: '/request/:id',
  //   name: 'Request',
  //   component: () => import('../views/Request.vue'),
  //   meta: {
  //     layout: 'main',
  //     auth: true,
  //   },
  // },
]

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    const currentUser = await getCurrentUser()

    if (!currentUser) next('/auth?message=auth')
    else next()
  } else next()
})

export default router
