import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api'
import { Popover, List, Tabs, Icon, Badge, Avatar, Tag } from 'ant-design-vue'
import style from './Bell.module.less'

type BellState = {
  noticeList: any[],
  messageList: any[],
  needBellList: any[],
}

interface BellProps {
  theme: string
}

export default defineComponent({
  name: 'Bell',
  props: {
    theme: {
      type: String,
      required: false
    }
  },
  setup (props: BellProps) {
    const state = reactive({
      noticeList: [
        {
          title: '你收到了 14 份周报',
          time: '3年前',
          status: false,
          avatar: require('../../assets/notice_icon/icon-type-4.png')
        },
        {
          title: '你推荐的 曲妮妮 已通过第三轮面试',
          time: '3年前',
          status: true,
          avatar: require('../../assets/notice_icon/icon-type-3.png')
        },
        {
          title: '这种模板可以区分多种类型数据',
          time: '3年前',
          status: false,
          avatar: require('../../assets/notice_icon/icon-type-2.png')
        },
        {
          title: '左侧图片用于区分不同类型',
          time: '3年前',
          status: false,
          avatar: require('../../assets/notice_icon/icon-type-1.png')
        },
        {
          title: '内容不要超过两行字，超出时自动截断',
          time: '3年前',
          status: false,
          avatar: require('../../assets/notice_icon/icon-type-4.png')
        }
      ],
      messageList: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '曲妮妮 评论了你',
          desc: '描述信息描述信息描述信息',
          time: '3年前',
          status: false
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '左骗右 回复了你',
          desc: '描述信息描述信息描述信息',
          time: '3年前',
          status: false
        }
      ],
      needBellList: [
        {
          title: '任务名称',
          desc: '任务需要在 2017-01-12 20:00 前启动',
          type: 0,
          status: false,
          text: '未开始'
        },
        {
          title: '第三方紧急代码变更',
          desc: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          type: 3,
          status: false,
          text: '马上到期'
        }
      ]
    })
    const renderListFooter = () => (
      <div class={style.notice_footer}>
        <div>清空消息</div>
        <div>查看更多</div>
      </div>
    )
    const types: any = {
      0: '',
      1: 'blue',
      2: 'orange',
      3: 'red',
      4: '',
      5: 'green'
    }
    return () => (
      <Popover
        trigger={['click']}
        destroyTooltipOnHide
        arrowPointAtCenter
        placement="bottomRight"
        overlayClassName={style.notice_wrap}
        scopedSlots={{
          content: () => (
            <div class={style.notice} onClick={() => false}>
              <Tabs defaultActiveKey={1}>
                <Tabs.TabPane tab={`通知 (${state.noticeList.length})`} key={1}>
                  <div class={style.notice_content}>
                    <List
                      dataSource={state.noticeList}
                      scopedSlots={{
                        footer: renderListFooter,
                        renderItem: (item: any) => (
                          <List.Item class={style.list_item} disabled={item.status}>
                            <List.Item.Meta
                              avatar={<Avatar size={32} src={item.avatar} />}
                              title={item.title}
                              description={item.time} />
                          </List.Item>
                        )
                      }} />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={`消息 (${state.messageList.length})`} key={2}>
                  <div class={style.notice_content}>
                    <List
                      dataSource={state.messageList}
                      scopedSlots={{
                        footer: renderListFooter,
                        renderItem: (item: any) => (
                          <List.Item class={style.list_item} disabled={item.status}>
                            <List.Item.Meta
                              avatar={<Avatar size={32} src={item.avatar} />}
                              title={item.title}
                              description={<div>
                                <div>{item.desc}</div>
                                <div>{item.time}</div>
                              </div>} />
                          </List.Item>
                        )
                      }} />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={`待办 (${state.needBellList.length})`} key={3}>
                  <div class={style.notice_content}>
                    <List
                      dataSource={state.needBellList}
                      scopedSlots={{
                        footer: renderListFooter,
                        renderItem: (item: any) => (
                          <List.Item
                            class={style.list_item}
                            disabled={item.status}
                            extra={<Tag color={types[item.type]}>{item.text}</Tag>}>
                            <List.Item.Meta
                              title={item.title}
                              description={item.desc} />
                          </List.Item>
                        )
                      }} />
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          )
        }}>
        <span class={[style.item, style[props.theme]]}>
          <Badge count={11} offset={[5, -5]}>
            <Icon type="bell" class={style.icon} />
          </Badge>
        </span>
      </Popover>
    )
  }
})
