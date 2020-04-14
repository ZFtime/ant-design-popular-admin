import { defineComponent } from '@vue/composition-api'
import style from './Page.module.less'

export default defineComponent({
  name: 'Page',
  setup () {
    return () => (
      <div class={style.content}>

      </div>
    )
  }
})
