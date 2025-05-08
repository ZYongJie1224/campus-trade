import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ProductDetail from '../views/ProductDetail.vue'
import PostProduct from '../views/PostProduct.vue'
import SearchResult from '../views/SearchResult.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ProductDetail/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/PostProduct',
    name: 'PostProduct',
    component: PostProduct
  },
  { path: '/search', name: 'SearchResult', component: SearchResult },
  {
    path: '/orders',
    name: 'OrderList',
    component: () => import('@/views/OrderList.vue')
  },
  {
    path: '/order/:orderId',
    name: 'OrderDetail',
    component: () => import('@/views/OrderDetail.vue')
  },
  {
    path: '/UserCenter',
    name: 'UserCenter',
    component: () => import('@/views/UserCenter.vue')
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
