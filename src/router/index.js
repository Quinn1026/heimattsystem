import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入子组件
import Login from '@/views/login'
import Layout from '@/views/layout'
// 用户管理 users
import Users from '@/views/layout/users'
// 权限管理 rights
import RoleList from '@/views/layout/rights/roleList'
import Permission from '@/views/layout/rights/permission'
// 商品管理 categories
import Categories from '@/views/layout/categories'
// 订单管理 orders
import Orders from '@/views/layout/orders'
// 数据统计 reports
import Reports from '@/views/layout/reports'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    component: Layout,
    redirect: '/layout/users',
    children: [
      {
        path: 'users',
        component: Users
      },
      {
        path: 'roleList',
        component: RoleList
      },
      {
        path: 'permission',
        component: Permission
      },
      {
        path: 'categories',
        component: Categories
      },
      {
        path: 'orders',
        component: Orders
      },
      {
        path: 'reports',
        component: Reports
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
