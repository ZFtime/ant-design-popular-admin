import { CustomRouteConfig } from '@/types/CommonType'
import BasicLayout from '@/commonComponent/Layout/BasicLayout'
import RouteView from '@/commonComponent/Layout/RouteView'

const asyncRouteMap: CustomRouteConfig[] = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { keepAlive: true, title: 'menu.dashboard.default', icon: 'dashboard' },
        component: RouteView,
        redirect: '/dashboard/analysis',
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: {
              keepAlive: true,
              title: 'menu.dashboard.analysis'
            },
            component: () => import(/* webpackChunkName:"workplace" */ '@/pages/test/index')
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            meta: {
              keepAlive: true,
              title: 'menu.dashboard.workplace'
            },
            component: () => import(/* webpackChunkName:"workplace" */ '@/pages/dashboard/Workplace')
          }
        ]
      },
      {
        path: '/forms',
        name: 'forms',
        meta: { keepAlive: true, title: 'menu.form.default', icon: 'form' },
        component: RouteView,
        redirect: '/forms/basic-form',
        children: [
          {
            path: '/forms/basic-form',
            name: 'basic-form',
            meta: {
              keepAlive: true,
              title: 'menu.form.basic'
            },
            component: () => import(/* webpackChunkName:"basic-form" */ '@/pages/test/index')
          },
          {
            path: '/forms/step-form',
            name: 'step-form',
            meta: {
              keepAlive: true,
              title: 'menu.form.step'
            },
            component: () => import(/* webpackChunkName:"step-form" */ '@/pages/test/index')
          },
          {
            path: '/forms/advanced-form',
            name: 'advanced-form',
            meta: {
              keepAlive: true,
              title: 'menu.form.advanced'
            },
            component: () => import(/* webpackChunkName:"advanced-form" */ '@/pages/test/index1')
          }
        ]
      },
      {
        path: '/settings',
        name: 'settings',
        meta: { keepAlive: true, title: 'menu.settings.default', icon: 'setting' },
        component: RouteView,
        redirect: '/settings/position-manager',
        children: [
          {
            path: '/settings/position-manager',
            name: 'position-manager',
            meta: {
              keepAlive: true,
              title: 'menu.settings.positionManager',
              footerAction: true
            },
            component: () => import(/* webpackChunkName:"position-manager" */ '@/pages/settings/PositionManager')
          }
        ]
      }
    ]
  }
]

export {
  asyncRouteMap
}
