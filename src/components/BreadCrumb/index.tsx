import { defineComponent, reactive, onBeforeMount, watch } from '@vue/composition-api'
import { Breadcrumb } from 'ant-design-vue'
import { usePluginsInject } from '@/store'
import { RouteRecord } from 'vue-router'
import { i18nRender } from '@/locales'
import style from './BreadCrumb.module.less'

interface StateFace {
  name?: string | null,
  list: any[]
}

export default defineComponent({
  name: 'BreadCrumb',
  setup () {
    const { router } = usePluginsInject()
    const state: StateFace = reactive({
      name: '',
      list: []
    })
    const getBreadCrumb = () => {
      const { name, matched } = router.app.$route
      state.list = []
      state.name = name
      matched.forEach((item: RouteRecord) => {
        state.list.push(item)
      })
    }
    onBeforeMount(() => {
      getBreadCrumb()
    })
    watch(() => router.app.$route, () => {
      getBreadCrumb()
    })
    return () => (
      <Breadcrumb class={style.container}>
        {state.list.map((item: RouteRecord, index: number) => {
          return (
            <Breadcrumb.Item>
              {item.name !== state.name && index !== 1
                ? <router-link to={{ path: item.path === '' ? '/' : item.path }}>
                  {i18nRender(item.meta.title)}
                </router-link>
                : <span>{i18nRender(item.meta.title)}</span>}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }
})
