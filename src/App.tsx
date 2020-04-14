import { defineComponent, onMounted } from '@vue/composition-api'
import { ConfigProvider } from 'ant-design-vue'
import Customizer from '@/commonComponent/Customizer'
import { ConfigStateFace } from '@/store/modules/config'
import { useConfigInject } from '@/store'
import { langState } from '@/locales'
import './App.less'

export default defineComponent({
  name: 'App',
  setup () {
    const configState: ConfigStateFace = useConfigInject()
    // 更新设配类型
    const handleMediaQuery = (evt: any, device: string) => {
      // ipad
      if (evt.matches && device === 'flat') {
        if (!configState.collapsed.value) configState.collapsed.value = true
        // desktop
      } else if (evt.matches && device === 'desktop') {
        if (configState.collapsed.value) configState.collapsed.value = false
        // mobile
      } else if (evt.matches && device === 'mobile') {
        if (configState.collapsed.value) configState.collapsed.value = false
      }
      if (evt.matches) configState.device.value = device
    }
    onMounted(() => {
      const mobileSql = window.matchMedia('(max-width:769px)')
      const flatSql = window.matchMedia('(min-width:769px) and (max-width:1225px)')
      const desktopSql = window.matchMedia('(min-width:1226px)')
      // 监听页面大小变化
      handleMediaQuery(mobileSql, 'mobile')
      handleMediaQuery(flatSql, 'flat')
      handleMediaQuery(desktopSql, 'desktop')
      mobileSql.addEventListener('change', (evt) => handleMediaQuery(evt, 'mobile'))
      flatSql.addEventListener('change', (evt) => handleMediaQuery(evt, 'flat'))
      desktopSql.addEventListener('change', (evt) => handleMediaQuery(evt, 'desktop'))
    })
    return () => (
      <ConfigProvider locale={langState.ant}>
        <div id="app" class={['app', `app-${configState.device.value}`]}>
          <router-view />
          <Customizer />
        </div>
      </ConfigProvider>
    )
  }
})
