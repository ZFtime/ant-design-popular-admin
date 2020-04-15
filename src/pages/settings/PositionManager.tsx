import { defineComponent, onBeforeMount, onMounted, reactive, ref } from '@vue/composition-api'
import { Table, Pagination, Button, PageHeader, Icon, Divider, Checkbox, message, notification } from 'ant-design-vue'
import style from './PositionManager.module.less'
import Page from '@/components/Page'
import SearchToolBar from '@/components/SearchToolBar'
import { onBack } from '@/hooks/useCommon'
import { useConfigInject } from '@/store'
import getPositionPageList from '@/api/settings'

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
    const { isFlat, isMobile } = useConfigInject()
    const state = reactive({
      searchSource,
      dataColumns,
      loading: ref(false),
      source: [],
      indeterminate: ref(true),
      checkAll: ref(false)
    })
    const pageState = reactive({
      total: ref(0),
      size: ref('10'),
      current: ref<number>(1),
      pageSizeOptions: ['10', '20', '30', '40']
    })
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
    // 列表全选状态
    const onCheckAllChange = () => {
    }
    // 获取数据
    const getDataList = () => {
      state.loading = true
      getPositionPageList({ start: pageState.current, size: pageState.size }).then(res => {
        state.source = res.data.rows
        pageState.total = res.data.total
        state.loading = false
      })
    }
    // 页码改变的回调，参数是改变后的页码及每页条数
    const handlePageSizeChange = (page: number, pageSize: number) => {
      pageState.current = page
      pageState.size = String(pageSize)
      getDataList()
    }
    // pageSize 变化的回调
    const handleSizeChange = (current: number, size: string) => {
      pageState.current = current
      pageState.size = String(size)
      getDataList()
    }
    onMounted(() => {
      getDataList()
    })
    return () => (
      <Page scopedSlots={{
        footer: () => {
          return (
            <div class={style.footer}>
              <div class={style.footer_l}>
                <Checkbox
                  indeterminate={state.indeterminate}
                  change="onCheckAllChange"
                  checked={state.checkAll}>
                  已选25项
                </Checkbox>
                <span>容器数量：8个</span>
                <span>调用次数：265次</span>
              </div>
              {isFlat() || isMobile() ? (
                <Icon type="ellipsis" class={style.action_icon} />
              ) : (
                <div class={style.footer_r}>
                  <Button icon="delete" type="danger">批量删除</Button>
                  <Button>批量导出</Button>
                  <Button>批量创建职位</Button>
                  <Button type="primary">批量查看</Button>
                </div>
              )}
            </div>
          )
        }
      }}>
        <PageHeader onBack={onBack} class={style.header} title="职位管理" subTitle="员工职位管理" />
        <SearchToolBar dataSource={state.searchSource} />
        <div class={style.wrapper}>
          <div class={style.actions}>
            <span class={style.action_title}>职位列表</span>
            <Button icon="import">批量导入</Button>
            <Button icon="export">导出数据</Button>
            <Button type="primary" icon="plus">新增职位</Button>
            <Divider type="vertical" />
            <Icon type="column-height" class={style.action_icon} />
            <Icon type="fullscreen" class={style.action_icon} />
            <Icon type="reload" class={style.action_icon} />
            <Icon type="setting" class={style.action_icon} />
          </div>
          <Table
            loading={state.loading}
            columns={state.dataColumns}
            rowKey={(record: { id: any; }) => record.id}
            pagination={false}
            dataSource={state.source}
            rowSelection={rowSelection} />
          <div class={style.pagination}>
            <Pagination
              showSizeChanger
              showQuickJumper
              size={pageState.size}
              total={pageState.total}
              current={pageState.current}
              pageSizeOptions={pageState.pageSizeOptions}
              showTotal={(total: number, range: number[]) => `${total}个项目中的${range[0]}-${range[1]}个`}
              onChange={handlePageSizeChange}
              onShowSizeChange={handleSizeChange} />
          </div>
        </div>
      </Page>
    )
  }
})
