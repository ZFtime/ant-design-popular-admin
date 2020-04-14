import { computed, defineComponent, reactive } from '@vue/composition-api'
import style from './Header.module.less'
import { useConfigInject } from '@/store'
import { Layout, Icon } from 'ant-design-vue'
import Brand from '@/commonComponent/Brand'
import ToolBar from '@/commonComponent/Tools/ToolBar'
import Menu from '@/commonComponent/Menu'
import { CustomRouteConfig } from '@/types/CommonType'

interface HeaderProps {
  collapsed: boolean,
  layout: string,
  theme: string,
  contentWidth: string,
  menu: CustomRouteConfig[],
  fixed: boolean
}

export default defineComponent({
  name: 'Header',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    },
    layout: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    contentWidth: {
      type: String,
      required: true
    },
    menu: {
      type: Array,
      required: true
    },
    fixed: {
      type: Boolean,
      required: true
    }
  },
  setup (props: HeaderProps) {
    const config = useConfigInject()
    const handleChangeCollapsed = () => {
      config.collapsed.value = !config.collapsed.value
    }
    const state = reactive({
      style: computed(() => {
        if (config.isMobile() || config.layout.value === 'topMenu') {
          return 'width:100%'
        } else if (config.fixedHeader.value) {
          return props.collapsed ? 'width:calc(100% - 80px);' : 'width:calc(100% - 260px);'
        }
      })
    })

    return () => (
      <Layout.Header class={style.header}>
        <Layout.Header
          class={[style.header_wrapper, props.fixed ? style.fixed : null]}
          style={state.style}>
          {(props.layout === 'sideMenu' || config.isMobile()) ? (
            <div class={style.globalHeader}>
              {config.isMobile() ? <Brand theme='light' class={style.globalHeaderLogo} collapsed={true} /> : null}
              <span class={style.trigger} onclick={handleChangeCollapsed}>
                {config.isMobile()
                  ? <Icon type='menu' />
                  : <Icon type={config.collapsed.value ? 'menu-unfold' : 'menu-fold'} />}
              </span>
              <ToolBar />
            </div>
          ) : (
            <div class={[style.wrapper, style[props.theme]]}>
              <div class={[style.headerMain, props.contentWidth === 'fixed' && 'wide']}>
                <Brand theme={props.theme} class={style.headerMainLogo} collapsed={false} />
                <div class={style.headerMainMenu}>
                  <Menu menu={props.menu} theme={props.theme} collapsed={false} mode='horizontal' />
                </div>
                <ToolBar theme={props.theme} />
              </div>
            </div>
          )}
        </Layout.Header>
      </Layout.Header>
    )
  }
})
