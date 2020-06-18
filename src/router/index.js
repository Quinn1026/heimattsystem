import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入子组件
import Login from '@/views/login'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
