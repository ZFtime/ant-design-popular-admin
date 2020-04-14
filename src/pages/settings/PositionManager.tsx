import { defineComponent, onMounted, reactive } from '@vue/composition-api'
import { Table, Empty, Pagination, Button, PageHeader, Icon, Divider } from 'ant-design-vue'
import style from './PositionManager.module.less'
import SearchToolBar from '@/components/SearchToolBar'
import { onBack } from '@/hooks/useCommon'

const searchSource = [
  {
    label: '岗位编号',
    type: 'input',
    fieldName: 'positionNo',
    placeholder: '请输入岗位编号'
  },
  {
    label: '岗位名称',
    type: 'input',
    fieldName: 'name',
    placeholder: '请输入岗位名称'
  },
  {
    label: '状态',
    type: 'select',
    fieldName: 'status',
    placeholder: '岗位状态',
    options: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 }
    ]
  }
]
const dataColumns = [
  {
    title: '岗位编号',
    dataIndex: 'positionNo',
    key: 'positionNo',
    align: 'center'
  },
  {
    title: '岗位编码',
    dataIndex: 'positionCode',
    key: 'positionCode',
    align: 'center'
  },
  {
    title: '岗位名称',
    dataIndex: 'positionName',
    key: 'positionName',
    align: 'center'
  },
  {
    title: '岗位排序',
    dataIndex: 'positionSerial',
    key: 'positionSerial',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default defineComponent({
  name: 'PositionManager',
  setup () {
    const state = reactive({
      searchSource,
      dataColumns,
      source: []
    })
    const test = () => {
      console.log(state)
    }
    const rowSelection = {
      onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record: any, selected: any, selectedRows: any) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
        console.log(selected, selectedRows, changeRows)
      }
    }
    return () => (
      <div class={style.page}>
        <PageHeader onBack={onBack} title="职位管理" subTitle="员工职位管理" />
        <SearchToolBar dataSource={state.searchSource} />
        <div class={style.wrapper}>
          <div class={style.actions}>
            <span class={style.action_title}>职位列表</span>
            <Button icon="import">批量导入</Button>
            <Button icon="export">导出数据</Button>
            <Button type="primary" icon="plus">新增职位</Button>
            <Divider type="vertical" />
            <Icon type="reload" class={style.action_icon}></Icon>
            <Icon type="setting" class={style.action_icon}></Icon>
            <Icon type="border" class={style.action_icon}></Icon>
          </div>
          <Table columns={state.dataColumns} dataSource={state.source} rowSelection={rowSelection} />
          <div class={style.pagination}>
            <Pagination total={500} current={2} size="20" showQuickJumper />
          </div>
        </div>
      </div>
    )
  }
})
