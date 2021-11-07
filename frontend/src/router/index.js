import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/compras',
    name: 'Compras',
    component: () => import('../views/compras/Compras.vue')
  },
  {
    path: '/finanzas',
    name: 'Finanzas',
    component: () => import('../views/finanzas/Finanzas.vue')
  },
  {
    path: '/recursos',
    name: 'Recursos',
    component: () => import('../views/recursos/Recursos.vue')
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import('../views/ventas/Ventas.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
