import style from './User-Layout.module.less'
import { defineComponent } from '@vue/composition-api'
import { Dropdown, Menu, Icon } from 'ant-design-vue'
import Logo from '@/assets/logo.svg'
import { i18nRender, langState, loadLanguageAsync } from '@/locales'

export default defineComponent({
  name: 'UserLayout',
  setup () {
    return () => (
      <div class={style.wrapper}>
        <div class={style.other}>
          <div class={style.ironical}>
            <h2 class={style.ironicalTitle}>{i18nRender('user.welcome.title')}</h2>
            <p class={style.ironicalDesc}>{i18nRender('user.welcome.desc')}</p>
            <p class={style.ironicalMeta}>{i18nRender('user.welcome.meta')}</p>
          </div>
        </div>
        <div class={style.container}>
          <div class={style.header}>
            <img src={Logo} alt="logo" class={style.logo} />
            <Dropdown trigger={['click']} overlayStyle={({ width: '160px' })} scopedSlots={({
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
            })}>
              <Icon type="global" class={style.langIcon} />
            </Dropdown>
          </div>
          <div class={style.form}>
            <router-view />
          </div>
        </div>
      </div>
    )
  }
})
