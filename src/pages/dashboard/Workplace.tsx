import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { Icon, Row, Col } from 'ant-design-vue'
import style from './Workplace.module.less'

type WorkplaceState = {
  setupStatusList: any[]
}

export default defineComponent({
  name: 'Workplace',
  setup () {
    const state = reactive({
      setupStatusList: [
        {
          title: '集群管理',
          desc: '这是一段功能介绍这是一段功能介绍这是一段功能介绍',
          status: true,
          btn: '创建集群'
        },
        {
          title: '初始化应用引擎',
          desc: '这是一段功能介绍这是一段功能介绍这是一段功能介绍',
          status: true,
          btn: '创建化应用引擎'
        },
        {
          title: '创建应用服务',
          desc: '这是一段功能介绍这是一段功能介绍这是一段功能介绍',
          status: false,
          btn: '创建应用服务'
        },
        {
          title: '管理版本流量',
          desc: '这是一段功能介绍这是一段功能介绍这是一段功能介绍',
          status: false,
          btn: '创建版本'
        }
      ]
    })
    return {
      ...toRefs(state)
    }
  },
  render () {
    const { setupStatusList } = (this as WorkplaceState)
    return (
      <div class={style.wrapper}>
        <div class={style.welcome}>
          <div class={style.head}>
            <h2>Hi，欢迎使用 Ant Design Pro！</h2>
            <p>轻松穿件、部署和管理你的中后台产品，提升研发效率，降低业务成本。
              <Icon type="book"/>
              <a href="javascript:;">开启引导</a>
            </p>
            <Icon type="up-circle" class={style.upBtn}/>
          </div>
          <div class={style.action}>
            <Row gutter={20} justify="space-between">
              {setupStatusList.map((item, index) => {
                return (
                  <Col md={12} xl={6} class={style.action_row}>
                    <h3 class={style.action_title}>
                      {item.status
                        ? <Icon type="check-circle" class={style.action_check}/>
                        : <span class={style.action_no}>{index + 1}</span>}
                      {item.title}
                    </h3>
                    <p class={style.action_desc}>{item.desc}</p>
                    {!item.status ? <a href="javascript:;" class={style.action_btn}>{item.btn}</a> : null}
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>

      </div>
    )
  }
})
