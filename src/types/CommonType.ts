import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { RouteConfig } from 'vue-router'

export type FormProps = {
  form: WrappedFormUtils
}

/**
 * 自定义meta字段
 */
export interface RouteMeta {
  title?: string | undefined,
  position?: string,
  key?: string,
  menuType?: string,
  hidden?: boolean,
  hideChildrenInMenu?: boolean,
  keepAlive?: boolean,
  target?: string,
  icon?: any,
  group?: string
}

/**
 * 自定义router配置参数
 */
export interface CustomRouteConfig extends RouteConfig {
  meta: RouteMeta,
  children?: CustomRouteConfig[]
}
