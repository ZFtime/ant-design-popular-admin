import { provide, inject } from '@vue/composition-api'
import { VueRouter } from 'vue-router/types/router'

type PluginsContext = {
  router: VueRouter
}

const PluginsSymbol = Symbol('PluginsSymbol')

export const usePluginsProvide = (state: PluginsContext) => {
  provide(PluginsSymbol, state)
}

export const usePluginsInject = () => {
  const pluginsContext = inject<PluginsContext>(PluginsSymbol)
  if (!pluginsContext) {
    throw new Error('usePluginsInject must be used after usePluginsProvide')
  }
  return pluginsContext
}
