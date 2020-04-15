import { usePluginsProvide, usePluginsInject } from '@/store/modules/plugin'
import { useConfigProvide, useConfigInject } from '@/store/modules/config'
import { useCommonProvide, useCommonInject } from '@/store/modules/comm'
import router from '@/router'

export const useProvide = () => {
  usePluginsProvide({ router })
  useConfigProvide()
  useCommonProvide()
}

export {
  useConfigInject,
  usePluginsInject,
  useCommonInject
}
