import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Clipboard from '@/components/Clipboard'
import { message } from 'ant-design-vue'
import SearchToolBar from '@/components/SearchToolBar'

interface TestProps {
  text: string,
  changeText: () => void,
  renderText: () => void,
  status: boolean
}

export default defineComponent({
  name: 'Test1',
  setup () {
    const state = reactive({
      text: '测试',
      status: false
    })

    function changeText () {
      state.text = '哈哈'
      state.status = true
    }

    const renderText = () => {
      return (
        <div>
          {state.status ? <h2>这是更新html{state.text}</h2> : <span>师德师风{state.text}</span>}
        </div>
      )
    }

    function handleCopySuccess () {
      message.success('ok')
    }

    const source = [
      {
        label: '姓名',
        type: 'input',
        fieldName: 'name',
        placeholder: '请输入用户名称'
      },
      {
        label: '年龄',
        type: 'number',
        fieldName: 'age',
        placeholder: '请输入年龄'
      },
      {
        label: '性别',
        type: 'radio',
        fieldName: 'tag',
        placeholder: '',
        options: [
          { label: '男', value: 0 },
          { label: '女', value: 1 }
        ]
      },
      {
        label: '生日',
        type: 'datetime',
        fieldName: 'birthday',
        placeholder: '请选择生日',
        props: {
          showTime: true
        }
      },
      {
        label: '生日',
        type: 'datetimeRange',
        fieldName: 'timeRange',
        placeholder: ['起始时间', '结束时间']
      },
      {
        label: '状态',
        type: 'select',
        fieldName: 'status',
        placeholder: '请选择状态',
        options: [
          { label: '男', value: 0 },
          { label: '女', value: 1 }
        ]
      },
      {
        label: '分类',
        type: 'cascader',
        fieldName: 'type',
        placeholder: '请选择分类',
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake'
                  }
                ]
              }
            ]
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
    return () => (
      <div>
        <SearchToolBar dataSource={source} />
      </div>
    )
  }
})
