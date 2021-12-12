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
    path: '/contratos',
    name: 'Contratos',
    component: () => import('../views/ContratosModulo.vue')
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: () => import('../views/EmpleadosModulo.vue')
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
