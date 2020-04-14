import { provide, inject, Ref, ref } from '@vue/composition-api'

const ConfigSymbol = Symbol('ConfigSymbol')

export interface ConfigStateFace {
  device: Ref<string>,
  navTheme: Ref<string>,
  layout: Ref<string>,
  fixedHeader: Ref<boolean>,
  fixedAside: Ref<boolean>,
  collapsed: Ref<boolean>,
  contentWidth: Ref<string>,
  isMobile: () => boolean,
  isFlat: () => boolean,
  isDesktop: () => boolean
}

export const useConfigProvide = () => {
  const device: Ref<string> = ref('')
  const navTheme: Ref<string> = ref('')
  const layout: Ref<string> = ref('')
  const contentWidth: Ref<string> = ref('')
  const fixedHeader: Ref<boolean> = ref(false)
  const fixedAside: Ref<boolean> = ref(false)
  const collapsed: Ref<boolean> = ref(false)
  const isMobile = () => device.value === 'mobile'
  const isFlat = () => device.value === 'flat'
  const isDesktop = () => device.value === 'desktop'
  provide(ConfigSymbol, {
    device,
    navTheme,
    layout,
    contentWidth,
    fixedHeader,
    fixedAside,
    collapsed,
    isMobile,
    isFlat,
    isDesktop
  })
}

export const useConfigInject = () => {
  const configState = inject<ConfigStateFace>(ConfigSymbol)
  if (!configState) {
    throw new Error('useConfigInject must be used after useConfigProvide')
  }
  return configState
}
