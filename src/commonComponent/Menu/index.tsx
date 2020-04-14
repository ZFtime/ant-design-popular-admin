import { defineComponent, reactive, computed, watch, onMounted, toRefs } from '@vue/composition-api'
import { Menu, Icon } from 'ant-design-vue'
import { usePluginsInject } from '@/store'
import { CustomRouteConfig } from '@/types/CommonType'
import style from './Menu.module.less'
import { i18nRender } from '@/locales'

// state
type StateType = {
  openKeys: string[]
  selectedKeys: string[],
  cachedOpenKeys: string[],
  rootSubMenuKeys: any
}

// props
type PropsType = {
  menu: CustomRouteConfig[],
  theme: string,
  collapsed: boolean,
  mode: string
}

// render data
type RenderDataType = {
  mode: string,
  theme: string,
  openKeys: string[],
  selectedKeys: string[],
  menuList: CustomRouteConfig[],
  onOpenChange: () => any,
  onSelectKeys: () => any
}

export default defineComponent({
  name: 'Menu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  setup (props: PropsType) {
    const { router } = usePluginsInject()
    const state: StateType = reactive({
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      rootSubMenuKeys: computed(() => {
        let keys: string[] = []
        props.menu.forEach((item: CustomRouteConfig) => {
          keys.push(item.path)
        })
        return keys
      })
    })
    // 当前展开菜单
    const onOpenChange = (openKeys: string[]) => {
      if (props.mode === 'horizontal') {
        state.openKeys = openKeys
        return
      }
      const latestOpenKey: string | undefined = openKeys.find((key: string) => !state.openKeys.includes(key))
      if (latestOpenKey && state.rootSubMenuKeys.includes(latestOpenKey)) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    // 选中当前菜单
    const onSelectKeys = (obj: any) => {
      state.selectedKeys = obj.selectedKeys
    }
    // 更新当前选中菜单
    const updateMenu = () => {
      const $route = router.app.$route
      const routes = $route.matched.concat()
      const { hidden } = $route.meta
      if (routes.length >= 3 && hidden) {
        routes.pop()
        state.selectedKeys = [routes[routes.length - 1].path]
      } else {
        let currentRoutes = routes.pop()
        state.selectedKeys = currentRoutes ? [currentRoutes.path] : []
      }
      const openKeys: any[] = []
      routes.forEach((item: any) => openKeys.push(item.path))
      props.collapsed ? (state.cachedOpenKeys = openKeys) : state.openKeys = openKeys
    }
    watch(() => router.app.$route, () => updateMenu())
    watch(() => props.collapsed, () => {
      if (props.collapsed) {
        state.cachedOpenKeys = state.openKeys.concat()
        state.openKeys = []
      } else {
        state.openKeys = state.cachedOpenKeys
      }
    })
    onMounted(() => {
      updateMenu()
      // fix: 初始化完成清空horizontal状态下的openKeys
      if (props.mode === 'horizontal') {
        state.openKeys = []
      }
    })
    return {
      ...toRefs(state),
      onOpenChange,
      onSelectKeys,
      menuList: props.menu
    }
  },
  render () {
    const { mode, theme, menuList, openKeys, selectedKeys, onOpenChange, onSelectKeys } = (this as RenderDataType)
    // 渲染类型区分
    const renderItem = (menu: CustomRouteConfig) => {
      if (menu.meta && menu.meta.hidden) return null
      if (menu.children && !menu.meta.hideChildrenInMenu) {
        return renderSubMenu(menu)
      } else {
        return renderMenuItem(menu)
      }
    }
    /**
     * 多级菜单
     * @param menu
     */
    const renderSubMenu = (menu: CustomRouteConfig) => {
      const itemArr: any = []
      if (!menu.meta.hideChildrenInMenu && menu.children) {
        menu.children.forEach((item: CustomRouteConfig) => {
          itemArr.push(renderItem(item))
        })
      }
      return (
        <Menu.SubMenu {...{ key: menu.path }} scopedSlots={{
          title: () => (
            <span>
              {renderIcon(menu.meta.icon)}
              <span>{i18nRender(menu.meta.title || '')}</span>
            </span>
          )
        }}>
          {itemArr}
        </Menu.SubMenu>
      )
    }
    /**
     * 单菜单
     * @param menu
     */
    const renderMenuItem = (menu: CustomRouteConfig) => {
      const target = menu.meta.target || null
      const Tag = (target && 'a') || 'router-link'
      if (menu.children && menu.meta.hideChildrenInMenu) {
        menu.children.forEach((item: CustomRouteConfig) => {
          item.meta = Object.assign(item.meta, { hidden: true })
        })
      }
      return (
        <Menu.Item {...{ key: menu.path }}>
          <Tag {...{
            props: {
              to: { name: menu.name }
            },
            attrs: {
              href: menu.path,
              target: menu.meta.target
            }
          }}>
            {renderIcon(menu.meta.icon)}
            <span>{i18nRender(menu.meta.title || '')}</span>
          </Tag>
        </Menu.Item>
      )
    }
    /**
     * 渲染图标
     * @param icon
     */
    const renderIcon = (icon: any) => {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props: any = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon {...{ props }} />
      )
    }
    // 菜单列表
    const menuTree = menuList.map((item: CustomRouteConfig) => {
      if (item.meta.hidden) return null
      return renderItem(item)
    })
    return (
      <Menu {...{
        class: style.menu,
        props: { mode: mode, theme: theme, openKeys: openKeys, selectedKeys: selectedKeys },
        on: { select: onSelectKeys, openChange: onOpenChange }
      }}>
        {menuTree}
      </Menu>
    )
  }
})
