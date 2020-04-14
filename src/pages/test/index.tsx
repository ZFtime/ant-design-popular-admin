import style from './test.module.less'
import { defineComponent } from '@vue/composition-api'
import { Table } from 'ant-design-vue'

export default defineComponent({
  name: 'test',
  setup () {
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' }
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ]
    return () => (
      <div class={style.background}>
        test
        <img src="../../assets/A_kJM2Q6uPXCAAAAAAAAAAAABkARQnAQ.png" alt="" />
        <Table columns={columns} dataSource={data}>
        </Table>
      </div>
    )
  }
})
