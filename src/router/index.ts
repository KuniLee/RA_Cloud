import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
  // {
  //   path: '/auth',
  //   name: 'Auth',
  //   component: () => import('../views/Auth.vue'),
  //   meta: {
  //     layout: 'auth',
  //   },
  // },
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const requireAuth = to.meta.auth
//
//   // if (requireAuth && store.getters['auth/isAuthenticated']) {
//   //   next()
//   // } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
//   //   next('/auth?message=auth')
//   // } else {
//   //   next()
//   // }
// })

export default router
