import { defineComponent } from '@vue/composition-api'
import SearchToolBar from '@/components/SearchToolBar'

export default defineComponent({
  name: 'TableList',
  setup () {
    return () => (
      <div>
        <SearchToolBar dataSource={[]} />
      </div>
    )
  }
})
