import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  Ref,
  ref,
  watch,
  watchEffect,
  SetupContext
} from '@vue/composition-api'
import { Form, Input, InputNumber, Radio, DatePicker, Select, Cascader, Row, Col, Button, Icon } from 'ant-design-vue'
import style from './SearchToolBar.module.less'
import { FormProps } from '@/types/CommonType'
import moment from 'moment'

// 控件类型
enum TypeEnum {
  input = 'input',
  number = 'number',
  radio = 'radio',
  datetime = 'datetime',
  datetimeRange = 'datetimeRange',
  select = 'select',
  cascader = 'cascader'
}

// 控件大小
enum SizeEnum {
  default = 'default',
  large = 'large',
  small = 'small'
}

// 下拉options参数
interface OptionFace {
  label: string,
  value: string | number
}

// 控件参数
interface ControlState {
  label: string,
  type: TypeEnum,
  fieldName: string,
  placeholder: string,
  props?: object,
  options?: any[]
}

// props参数类型
type SearchToolBarProps = {
  // 列布局
  responsive: object,
  // 超过多少个产生折叠
  maxItem: number,
  // 控件的间距
  gutter: number,
  // 控件的尺寸
  size: SizeEnum,
  // label input宽度
  labelCol: object,
  wrapperCol: object,
  // 搜索条件列表
  dataSource: ControlState[]
}

interface formPropsState {
  config: SearchToolBarProps,
  collapsed: boolean
}

const formState = reactive({
  config: {
    responsive: {},
    maxItem: 3,
    gutter: 20,
    size: 'default',
    labelCol: {},
    wrapperCol: {},
    dataSource: []
  },
  collapsed: true
}) as formPropsState

const SearchToolBarForm = defineComponent({
  name: 'SearchToolBarForm',
  setup (props: FormProps, content: SetupContext) {
    const { getFieldDecorator, resetFields } = props.form
    const handleSubmitForm = (e: Event) => {
      e.preventDefault()
      content.emit('change')
    }
    const handleResetForm = () => {
      resetFields()
    }
    // 切换展开状态
    const handleCollapsedToggle = () => {
      formState.collapsed = !formState.collapsed
    }
    return () => (
      <Form ref="form" layout="inline">
        <Row gutter={formState.config.gutter || 0}>
          {formState.config.dataSource.map((item: ControlState, index: number) => {
            const condition = (formState.config.maxItem > index ? true : (!formState.collapsed))
            if (item.type === TypeEnum.input && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <Input size={formState.config.size} placeholder={item.placeholder} {...{ props: item.props || {} }} />
                    )}
                  </Form.Item>
                </Col>
              )
            } else if (item.type === TypeEnum.number && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <InputNumber size={formState.config.size} placeholder={item.placeholder} {...{ props: item.props || {} }} style="width:100%;" />
                    )}
                  </Form.Item>
                </Col>
              )
            } else if (item.type === TypeEnum.radio && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <Radio.Group size={formState.config.size} buttonStyle="solid" {...{ props: item.props || {} }}>
                        {item.options && item.options.map((_item: OptionFace) => {
                          return (<Radio.Button value={_item.value}>{_item.label}</Radio.Button>)
                        })}
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              )
            } else if (item.type === TypeEnum.datetime && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <DatePicker size={formState.config.size} placeholder={item.placeholder} {...{ props: item.props || {} }} style="width:100%;" />
                    )}
                  </Form.Item>
                </Col>
              )
            } else if (item.type === TypeEnum.datetimeRange && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <DatePicker.RangePicker size={formState.config.size} placeholder={item.placeholder} {...{ props: item.props || {} }} style="width:100%;" />
                    )}
                  </Form.Item>
                </Col>
              )
            } else if (item.type === TypeEnum.select && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <Select size={formState.config.size} buttonStyle="solid" placeholder={item.placeholder} {...{ props: item.props || {} }}>
                        {item.options && item.options.map((_item: OptionFace) => {
                          return (<Select.Option value={_item.value}>{_item.label}</Select.Option>)
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              )
            } else if (item.type === TypeEnum.cascader && condition) {
              return (
                <Col {...{ props: formState.config.responsive }}>
                  <Form.Item class={style.form_item} {...{
                    props: {
                      label: item.label,
                      labelCol: formState.config.labelCol,
                      wrapperCol: formState.config.wrapperCol
                    }
                  }}>
                    {getFieldDecorator(item.fieldName, {})(
                      <Cascader size={formState.config.size} placeholder={item.placeholder} {...{ props: item.props || {} }} options={item.options} />
                    )}
                  </Form.Item>
                </Col>
              )
            }
          })}
          <Col {...{ props: formState.config.responsive }} style="float:right;">
            <div class={style.control}>
              <Button type="primary" size={formState.config.size} htmlType="submit" onClick={handleSubmitForm}>查询</Button>
              <Button size={formState.config.size} style={{ marginLeft: '8px' }} onClick={handleResetForm}>重置</Button>
              {formState.config.dataSource.length > formState.config.maxItem && (
                <a style={{ marginLeft: '8px' }} onClick={handleCollapsedToggle}>
                  {formState.collapsed ? '展开' : '收起'}
                  <Icon type={formState.collapsed ? 'down' : 'up'} style="margin-left:5px;" />
                </a>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
})

export default defineComponent({
  name: 'SearchToolBar',
  props: {
    responsive: {
      type: Object,
      default: function () {
        return {
          xxl: 6,
          lg: 12,
          span: 24
        }
      },
      required: false
    },
    maxItem: {
      type: Number,
      default: 3,
      required: false
    },
    gutter: {
      type: Number,
      default: 0,
      required: false
    },
    size: {
      type: String,
      default: 'default',
      required: false
    },
    labelCol: {
      type: Object,
      default: function () {
        return { span: 6 }
      },
      required: false
    },
    wrapperCol: {
      type: Object,
      default: function () {
        return { span: 18 }
      },
      required: false
    },
    dataSource: {
      type: Array,
      required: true
    }
  },
  setup (props: SearchToolBarProps, content: SetupContext) {
    formState.config = props
    const form: Ref<any> = ref(null)
    const SearchToolBarFormWrapper = Form.create({ name: 'SearchToolBarForm' })(SearchToolBarForm)
    const handleTest = () => {
      const { validateFields } = form.value
      validateFields((_: Error[], values: any) => {
        content.emit('change', values)
      })
    }
    return () => (
      <div class={style.search}>
        <SearchToolBarFormWrapper ref="form" onChange={handleTest} />
      </div>
    )
  }
})
