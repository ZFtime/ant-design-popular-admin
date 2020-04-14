import style from './Customizer.module.less'
import { defineComponent, reactive } from '@vue/composition-api'
import { Button, Drawer, Radio, Select, Switch, Alert, Icon, Divider, message } from 'ant-design-vue'
import { useConfigInject } from '@/store'
import { colorList } from '@/commonComponent/Customizer/themeColor'
import clipboard from '@/utils/clipboard'

export default defineComponent({
  name: 'Customizer',
  setup () {
    const state = reactive({
      settingVisible: false
    })
    const config = useConfigInject()

    const settingToggle = () => {
      state.settingVisible = !state.settingVisible
    }
    // 整体风格切换
    const handleNavThemeChange = (e: any) => {
      config.navTheme.value = e.target.value
    }
    // 导航模式切换
    const handleLayoutChange = (e: any) => {
      config.layout.value = e.target.value
      if (e.target.value === 'sideMenu') {
        config.contentWidth.value = 'fluid'
      }
    }
    const handleContentWidthChange = (value: string) => {
      config.contentWidth.value = value
    }

    const handleCopySetting = () => {
      const text = `export default {
        title: 'Ant Design Pro',
        navTheme: '${config.navTheme.value}',
        layout: '${config.layout.value}',
        contentWidth: '${config.contentWidth.value}',
        fixedHeader: ${config.fixedHeader.value},
        fixedAside: ${config.fixedAside.value}
      }`
      clipboard(text).then(() => {
        message.success('拷贝成功，请到 src/config/setting.ts 中替换默认配置')
        // eslint-disable-next-line handle-callback-err
      }).catch((error: Error) => {
        // console.log(error)
      })
    }

    return () => (
      <div class={style.wrapper}>
        <Button type="primary" size="large" shape="circle" icon="experiment" onClick={settingToggle} class={style.btn} />
        <Button type="danger" size="large" shape="circle" icon="bug" class={style.btn} />
        <Button size="large" shape="circle" icon="question" class={style.btn} />
        <Drawer visible={state.settingVisible} onClose={settingToggle} closable destroyOnClose width={320}>
          <div class={style.item}>
            <h3>整体风格设置</h3>
            <Radio.Group value={config.navTheme.value} onChange={handleNavThemeChange} buttonStyle="solid" style="width:100%;">
              <Radio.Button value="light" class={style.item_button}>Light</Radio.Button>
              <Radio.Button value="dark" class={style.item_button}>Dark</Radio.Button>
            </Radio.Group>
          </div>
          <div class={style.item}>
            <h3>导航模式</h3>
            <Radio.Group value={config.layout.value} onChange={handleLayoutChange} buttonStyle="solid" style="width:100%;">
              <Radio.Button value="topMenu" class={style.item_button}>顶部导航</Radio.Button>
              <Radio.Button value="sideMenu" class={style.item_button}>侧边栏导航</Radio.Button>
            </Radio.Group>
          </div>
          <div class={style.item}>
            <h3>主题颜色</h3>
            <div class={style.color_list}>
              {colorList.map(item => {
                return <span style={{ backgroundColor: item.color }} class={style.color_item} />
              })}
            </div>
          </div>
          <Divider />
          <ul class={style.list}>
            <li class={style.list_item}>
              <span class={style.item_label}>内容区域宽度</span>
              <Select value={config.contentWidth.value} onChange={handleContentWidthChange} class={style.item_right} style="width:90px;">
                <Select.Option disabled={config.layout.value === 'sideMenu'} value="fixed">Fixed</Select.Option>
                <Select.Option value="fluid">Fluid</Select.Option>
              </Select>
            </li>
            <li class={style.list_item}>
              <span class={style.item_label}>固定 Header</span>
              <Switch
                checked={config.fixedHeader.value}
                onClick={() => { config.fixedHeader.value = !config.fixedHeader.value }}
                class={style.item_right} />
            </li>
            <li class={style.list_item}>
              <span class={style.item_label}>固定侧边菜单栏</span>
              <Switch
                checked={config.fixedAside.value}
                onClick={() => { config.fixedAside.value = !config.fixedAside.value }}
                class={style.item_right} />
            </li>
          </ul>
          <Divider />
          <Alert
            message="配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件"
            type="warning"
            showIcon
            scopedSlots={{
              icon: () => <Icon type="notification" />
            }} />
          <Button style="width:100%;margin-top:20px" onClick={handleCopySetting}>拷贝设置</Button>
        </Drawer>
      </div>
    )
  }
})
