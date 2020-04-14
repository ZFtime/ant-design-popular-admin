import { defineComponent } from '@vue/composition-api'
import style from './Brand.module.less'
import Logo from '@/assets/logo.svg'

interface BrandProps {
  theme: string,
  collapsed: boolean
}

export default defineComponent({
  name: 'Brand',
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup (props: BrandProps) {
    return () => (
      <div class={[style.brand, style[props.theme]]}>
        <a id="logo">
          <img src={Logo} alt="" />
          {props.collapsed ? null : <h1>Ant Design Pro</h1>}
        </a>
      </div>
    )
  }
})
