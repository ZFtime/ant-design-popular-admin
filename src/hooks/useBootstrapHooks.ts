import { onMounted } from '@vue/composition-api'
import storage from 'localforage'
import { useConfigInject } from '@/store'
import settings from '@/config/settings'
import { ConfigStateFace } from '@/store/modules/config'
import { loadLanguageAsync } from '@/locales'

export const bootstrap = () => {
  const config: ConfigStateFace = useConfigInject()
  onMounted(async () => {
    // console.log('config bootstrap!')
    // 初始化配置
    config.navTheme.value = settings.navTheme
    config.layout.value = settings.layout
    config.contentWidth.value = settings.contentWidth
    config.fixedHeader.value = settings.fixedHeader
    config.fixedAside.value = settings.fixedAside
    const locale: string = await storage.getItem('language')
    await loadLanguageAsync(locale)
  })
}
