import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import UserLayout from '@/commonComponent/Layout/UserLayout'
import { asyncRouteMap } from '@/config/router.config'
import { CustomRouteConfig } from '@/types/CommonType'

Vue.use(VueCompositionApi)
Vue.use(VueRouter)

const routes: CustomRouteConfig[] = [
  {
    path: '/user',
    name: 'user',
    redirect: '/user/login',
    meta: {
      title: 'Ant design pro'
    },
    component: UserLayout,
    children: [
      {
        path: '/user/login',
        name: 'login',
        meta: { title: '登陆' },
        component: () => import(/* webpackChunkName: "login" */ '@/pages/user/Login')
      },
      {
        path: '/user/register',
        name: 'register',
        meta: { title: '注册' },
        component: () => import(/* webpackChunkName: "register" */ '@/pages/user/Register')
      },
      {
        path: '/user/forget',
        name: 'forget',
        meta: { title: '忘记密码' },
        component: () => import(/* webpackChunkName: "forget" */ '@/pages/user/Forget')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(asyncRouteMap)
})

export default router
