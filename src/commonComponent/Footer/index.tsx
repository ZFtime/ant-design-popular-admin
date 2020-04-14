import { defineComponent } from '@vue/composition-api'
import { Layout, Icon } from 'ant-design-vue'
import style from './Footer.module.less'

export default defineComponent({
  name: 'Footer',
  setup () {
    return () => (
      <Layout.Footer>
        <div class={style.footer}>
          <div class={style.links}>
            <a title="Ant Design Pro" target="_blank" href="https://pro.ant.design">Ant Design Pro</a>
            <a title="github" target="_blank" href="https://github.com/beFleeting/ant-design-pro-popular">
              <Icon type="github" />
            </a>
            <a title="Ant Design" target="_blank" href="https://ant.design">Ant Design</a>
          </div>
          <div class={style.copyright}>
            Copyright
            <Icon type="copyright" />
            2019 蚂蚁金服体验技术部出品
          </div>
        </div>
      </Layout.Footer>
    )
  }
})
