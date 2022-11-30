import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SubscribeList from '@/views/subscribe/subscribe-list.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/subscribe-list'
    },
    {
      path: '/subscribe-list',
      name: 'subscribeList',
      component: SubscribeList
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/school-list',
      name: 'schoolList',
      component: () => import('../views/school/school-list.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    }
  ]
})

export default router
