import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'RouteView',
  setup () {
    return () => (
      <div>
        <router-view />
      </div>
    )
  }
})
