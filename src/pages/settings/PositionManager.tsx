import { computed, defineComponent, onMounted, reactive, ref, watch } from '@vue/composition-api'
import { Button, Checkbox, Divider, Dropdown, Icon, Menu, PageHeader, Pagination, Table, Tooltip } from 'ant-design-vue'
import style from './PositionManager.module.less'
import Page from '@/components/Page'
import SearchToolBar from '@/components/SearchToolBar'
import { onBack } from '@/hooks/useCommon'
import { useCommonInject, useConfigInject } from '@/store'
import getPositionPageList from '@/api/settings'
import { TableSizeEnum } from '@/store/modules/comm'

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
    const { tableSize } = useCommonInject()
    // @ts-ignore
    const state = reactive({
      searchSource,
      dataColumns,
      // 加载状态
      loading: ref<boolean>(false),
      // 数据源
      source: [],
      // 选中key
      selectedRowKeys: ref<number[]>([]),
      // 是否存在选中列
      indeterminate: ref<boolean>(false),
      // 是否全选
      checked: ref<boolean>(false),
      // 选中列表的配置
      rowSelection: computed(() => {
        const selectedRowKeys: number[] = state.selectedRowKeys
        return {
          selectedRowKeys,
          onChange: (selectedRowKeys: number[]) => {
            state.selectedRowKeys = selectedRowKeys
          },
          hideDefaultSelections: true,
          selections: [
            {
              key: 'all-data',
              text: '选中所有列数据',
              onSelect: (changRowKeys: number[]) => {
                state.selectedRowKeys = changRowKeys
              }
            },
            {
              key: 'reverse-all-data',
              text: '反选所有列数据',
              onSelect: (changRowKeys: number[]) => {
                state.selectedRowKeys = changRowKeys.filter((key: number) => !state.selectedRowKeys.includes(key))
              }
            },
            {
              key: 'even-data',
              text: '选中偶数列数据',
              onSelect: (changRowKeys: number[]) => {
                state.selectedRowKeys = changRowKeys.filter((_, index: number) => index % 2 !== 0)
              }
            },
            {
              key: 'odd-data',
              text: '选中奇数列数据',
              onSelect: (changRowKeys: number[]) => {
                state.selectedRowKeys = changRowKeys.filter((_, index: number) => index % 2 === 0)
              }
            }
          ]
        }
      }),
      // 合并数量需要computed监听值
      statusTotal: computed(() => {
        return state.source.filter((item: any) => item.status === 1 && state.selectedRowKeys.includes(item.id)).length
      }),
      // 分页参数
      pager: {
        total: ref(0),
        size: ref('10'),
        current: ref<number>(1),
        pageSizeOptions: ['10', '20', '30', '40']
      }
    })
    // 获取数据
    const getDataList = () => {
      state.loading = true
      getPositionPageList({ start: state.pager.current, size: state.pager.size }).then(res => {
        state.source = res.data.rows
        state.pager.total = res.data.total
        state.loading = false
      })
    }
    // 切换全选反选
    const onCheckAllChange = (e: any) => {
      const checked = e.target.checked
      if (checked) {
        state.selectedRowKeys = state.source.map((item: any) => item.id)
      } else {
        state.selectedRowKeys = []
      }
      state.checked = checked
    }
    // 页码改变的回调，参数是改变后的页码及每页条数
    const handlePageSizeChange = (page: number, pageSize: number) => {
      state.pager.current = page
      state.pager.size = String(pageSize)
      // 切换数据页需清空选中列
      state.selectedRowKeys = []
      getDataList()
    }
    // pageSize 变化的回调
    const handleSizeChange = (current: number, size: string) => {
      state.pager.current = current
      state.pager.size = String(size)
      getDataList()
    }
    // table 大小变化
    const handleTableSizeChange = (size: string) => {
      console.log(size)
    }
    // 监听选中列的变化
    watch(() => state.selectedRowKeys, () => {
      if (!state.selectedRowKeys.length) {
        state.checked = false
        state.indeterminate = false
      } else if (state.selectedRowKeys.length < state.source.length) {
        state.checked = false
        state.indeterminate = true
      } else {
        state.checked = true
        state.indeterminate = false
      }
    })
    // 初始化渲染完成获取数据
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
                  onChange={onCheckAllChange}
                  checked={state.checked}>
                  已选{state.selectedRowKeys.length}项
                </Checkbox>
                <span class={style.footer_s}>已启用职位数量：{state.statusTotal}个</span>
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
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              scopedSlots={{
                overlay: () => (
                  <Menu onClick={handleTableSizeChange}>
                    <Menu.Item key={TableSizeEnum.default} disabled={tableSize.value === TableSizeEnum.default}>
                      <a href="javascript:;">默认</a>
                    </Menu.Item>
                    <Menu.Item key={TableSizeEnum.middle} disabled={tableSize.value === TableSizeEnum.middle}>
                      <a href="javascript:;">中等</a>
                    </Menu.Item>
                    <Menu.Item key={TableSizeEnum.small} disabled={tableSize.value === TableSizeEnum.small}>
                      <a href="javascript:;">紧凑</a>
                    </Menu.Item>
                  </Menu>
                )
              }}>
              <Tooltip title="密度">
                <Icon type="column-height" class={style.action_icon} />
              </Tooltip>
            </Dropdown>
            <Icon type="fullscreen" class={style.action_icon} />
            <Icon type="reload" class={style.action_icon} />
            <Icon type="setting" class={style.action_icon} />
          </div>
          <Table
            loading={state.loading}
            columns={state.dataColumns}
            rowKey={(record: { id: any; }) => record.id}
            pagination={false}
            size={tableSize.value}
            dataSource={state.source}
            rowSelection={state.rowSelection} />
          <div class={style.pagination}>
            <Pagination
              showSizeChanger
              showQuickJumper
              size={state.pager.size}
              total={state.pager.total}
              current={state.pager.current}
              pageSizeOptions={state.pager.pageSizeOptions}
              showTotal={(total: number, range: number[]) => `${total}个项目中的${range[0]}-${range[1]}个`}
              onChange={handlePageSizeChange}
              onShowSizeChange={handleSizeChange} />
          </div>
        </div>
      </Page>
    )
  }
})
