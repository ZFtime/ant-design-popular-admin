import { provide, inject, ref, Ref } from '@vue/composition-api'

export enum TableSizeEnum {
  default = 'default',
  middle = 'middle',
  small = 'small'
}

type CommonContext = {
  tableSize: Ref<TableSizeEnum>
}

const CommonSymbol = Symbol('CommonSymbol')

export const useCommonProvide = () => {
  const tableSize: Ref<TableSizeEnum> = ref(TableSizeEnum.small)
  provide(CommonSymbol, {
    tableSize
  })
}

export const useCommonInject = () => {
  const commonContext = inject<CommonContext>(CommonSymbol)
  if (!commonContext) {
    throw new Error('useCommonInject must be used after useCommonProvide')
  }
  return commonContext
}
