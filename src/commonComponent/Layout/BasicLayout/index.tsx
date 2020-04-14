import { computed, defineComponent, reactive } from '@vue/composition-api'
import { Drawer, Layout } from 'ant-design-vue'
import style from './Basic-Layout.module.less'
import Footer from '@/commonComponent/Footer'
import Header from '@/commonComponent/Header'
import Brand from '@/commonComponent/Brand'
import Menu from '@/commonComponent/Menu'
import { asyncRouteMap } from '@/config/router.config'
import { CustomRouteConfig } from '@/types/CommonType'
import { useConfigInject } from '@/store'

export default defineComponent({
  name: 'BasicLayout',
  setup () {
    const { collapsed, navTheme, isMobile, layout, contentWidth, fixedAside, fixedHeader } = useConfigInject()
    // 路由菜单列表
    const menuList: CustomRouteConfig[] = asyncRouteMap[0].children || []
    const closeMobileAsideHandle = () => {
      collapsed.value = false
    }
    const state = reactive({
      paddingLeft: computed(() => {
        if (isMobile() || !fixedAside.value || layout.value === 'topMenu') {
          return 0
        } else {
          return collapsed.value ? 80 : 260
        }
      }),
      wide: computed(() => {
        if (layout.value === 'topMenu' && contentWidth.value === 'fixed') {
          return 'wide'
        } else {
          return ''
        }
      })
    })
    return () => (
      <Layout class={style.wrapper}>
        {/* 手机端展示侧边栏菜单 */}
        {isMobile() && (
          <Drawer
            closable={false}
            width={260}
            maskClosable={true}
            placement='left'
            wrapClassName={[style.drawerMenu, style[navTheme.value]].join(' ')}
            onClose={closeMobileAsideHandle}
            zIndex={9999}
            visible={collapsed.value}>
            <Brand theme={navTheme.value} collapsed={false} />
            <Menu menu={menuList} theme={navTheme.value} collapsed={false} mode="inline" />
          </Drawer>
        )}
        {/* 不是手机端并且要是侧边菜单栏模式展示 菜单 */}
        {(!isMobile() && layout.value === 'sideMenu') && (
          <Layout.Sider
            class={[style.aside, style[navTheme.value], fixedAside.value ? style.aside_fixed : null]}
            collapsed={collapsed.value}
            collapsible
            theme={navTheme.value}
            collapsedWidth={80}
            width={260}
            trigger={null}>
            <Brand theme={navTheme.value} collapsed={collapsed.value} />
            <Menu menu={menuList} theme={navTheme.value} collapsed={collapsed.value} mode={collapsed.value ? 'vertical-right' : 'inline'} />
          </Layout.Sider>
        )}
        <Layout style={{ paddingLeft: state.paddingLeft + 'px', transition: 'all .2s' }}>
          <Header
            fixed={fixedHeader.value}
            collapsed={collapsed.value}
            layout={layout.value}
            theme={navTheme.value}
            menu={menuList}
            contentWidth={contentWidth.value} />
          <Layout.Content class={style.content_wrap}>
            {layout.value === 'topMenu' && contentWidth.value === 'fixed' ? (
              <div class={layout.value === 'topMenu' && contentWidth.value === 'fixed' ? 'wide' : ''}>
                <router-view />
              </div>
            ) : <router-view />}
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
})
