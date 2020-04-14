import { usePluginsProvide, usePluginsInject } from '@/store/modules/plugin'
import { useConfigProvide, useConfigInject } from '@/store/modules/config'
import router from '@/router'

export const useProvide = () => {
  usePluginsProvide({ router })
  useConfigProvide()
}

export {
  useConfigInject,
  usePluginsInject
}
