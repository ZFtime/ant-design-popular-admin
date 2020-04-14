import { defineComponent } from '@vue/composition-api'
import { Dropdown, Icon, Menu, Tooltip, Avatar, Divider, Badge, Tabs, List } from 'ant-design-vue'
import { langState, loadLanguageAsync } from '@/locales'
import Bell from '@/commonComponent/Tools/Bell'
import style from './ToolBar.module.less'

interface ToolBarProps {
  theme: string
}

export default defineComponent({
  name: 'ToolBar',
  props: {
    theme: {
      type: String,
      required: false
    }
  },
  setup (props: ToolBarProps) {
    // 文檔
    const renderDocs = () => (
      <Tooltip scopedSlots={{ title: () => '文档' }}>
        <span class={style.item}>
          <Icon type="question-circle" class={style.icon} />
        </span>
      </Tooltip>
    )
    // 个人信息
    const renderUserProfile = () => (
      <Dropdown trigger={['click']} placement="bottomRight" overlayStyle={{ minWidth: '160px' }} scopedSlots={{
        overlay: () => (
          <Menu>
            <Menu.Item>
              <a href="javascript:;"><Icon type="user" class={style.userIcon} />个人中心</a>
            </Menu.Item>
            <Menu.Item>
              <a href="javascript:;"><Icon type="setting" class={style.userIcon} />个人设置</a>
            </Menu.Item>
            <Divider style="margin:10px 0;" />
            <Menu.Item>
              <a href="javascript:;"><Icon type="logout" class={style.userIcon} />退出登录</a>
            </Menu.Item>
          </Menu>
        )
      }}>
        <span class={style.item}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span class={style.itemName}>Serati Ma</span>
        </span>
      </Dropdown>
    )
    // 国际化
    const renderGlobal = () => (
      <Dropdown trigger={['click']} placement="bottomRight" overlayStyle={{ width: '160px' }} scopedSlots={{
        overlay: () => (
          <Menu selectedKeys={[langState.locale]} onClick={({ key }: any) => loadLanguageAsync(key)}>
            <Menu.Item key="zh-CN">
              <a href="javascript:;">🇨🇳 简体中文</a>
            </Menu.Item>
            <Menu.Item key="en-US">
              <a href="javascript:;">🇺🇸 English</a>
            </Menu.Item>
          </Menu>
        )
      }}>
        <span class={style.item}>
          <Icon type="global" class={style.icon} />
        </span>
      </Dropdown>
    )
    return () => (
      <div class={[style.container, style[props.theme]]}>
        {renderDocs()}
        <Bell theme={props.theme} />
        {renderUserProfile()}
        {renderGlobal()}
      </div>
    )
  }
})
