import { computed, defineComponent, reactive, SetupContext } from '@vue/composition-api'
import { useConfigInject } from '@/store'
import BreadCrumb from '@/components/BreadCrumb'
import style from './Page.module.less'

interface PageProps {}

export default defineComponent({
  name: 'Page',
  setup (props: PageProps, content: SetupContext) {
    const { layout, collapsed, isMobile, contentWidth } = useConfigInject()
    const state = reactive({
      left: computed(() => {
        if (isMobile() || layout.value === 'topMenu') {
          return 0
        } else {
          return !collapsed.value ? '260px' : '80px'
        }
      })
    })
    return () => (
      <div class={style.content}>
        {content.slots.header ? content.slots.header() : <BreadCrumb />}
        {content.slots.default()}
        {content.slots.footer ? (
          <div class={style.footer} style={{ left: state.left }}>
            {layout.value === 'topMenu' && contentWidth.value === 'fixed' ? (
              <div class='wide'>
                {content.slots.footer()}
              </div>
            ) : content.slots.footer()}
          </div>
        ) : null}
      </div>
    )
  }
})
