import style from './Login.module.less'
import { defineComponent, reactive } from '@vue/composition-api'
import { Form, Input, Checkbox, Button, Divider, Icon } from 'ant-design-vue'
import { i18nRender } from '@/locales'
import { usePluginsInject } from '@/store'
import { Login } from '@/hooks/useUserHooks'
import { LoginFormState } from '@/types/FormStateType'
import { FormProps } from '@/types/CommonType'

const LoginForm = defineComponent({
  name: 'LoginForm',
  setup (props: FormProps) {
    const { router } = usePluginsInject()
    const { getFieldDecorator, validateFields } = props.form
    const state = reactive({
      loading: false
    })
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      validateFields((err: Error[], values: LoginFormState) => {
        if (!err) {
          // console.log('login form', values)
          state.loading = true
          Login(values).then(() => {
            state.loading = true
            router.push('/dashboard/analysis')
          })
        }
      })
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return () => (
      <Form {...formItemLayout} onSubmit={handleSubmit} class={style.form}>
        <Form.Item label={i18nRender('user.login.email.label')}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: i18nRender('user.login.email.regexMessage')
              }
            ]
          })(
            <Input size="large" placeholder={i18nRender('user.login.email.placeholder')} />
          )}
        </Form.Item>
        <Form.Item label={i18nRender('user.login.password.label')}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: i18nRender('user.login.password.regexMessage')
              }
            ]
          })(
            <Input type="password" size="large" placeholder={i18nRender('user.login.password.placeholder')} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>{i18nRender('user.login.remember')}</Checkbox>)}
          <router-link to="forget" class={style.forget}>{i18nRender('user.login.forget')}</router-link>
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" class={style.btn} loading={state.loading}>
          {i18nRender('user.login.submit')}
        </Button>
      </Form>
    )
  }
})
/**
 * 创建login form 表单
 */
const LoginFormWrapper = Form.create({})(LoginForm)

export default defineComponent({
  name: 'Login',
  setup () {
    return () => (
      <div class={style.wrapper}>
        <div class={style.container}>
          <h4 class={style.title}>{i18nRender('user.login.title')}</h4>
          <p class={style.desc}>{i18nRender('user.login.desc')}</p>
          <LoginFormWrapper />
          <Divider class={style.dividerTips}>
            {i18nRender('user.login.loginMode')}
          </Divider>
          <div class={style.otherLogin}>
            <router-link to="register">
              <Icon type="facebook" class={style.otherLoginItem} />
            </router-link>
            <router-link to="register">
              <Icon type="google" class={style.otherLoginItem} />
            </router-link>
            <router-link to="register">
              <Icon type="twitter" class={style.otherLoginItem} />
            </router-link>
            <router-link to="register">
              <Icon type="github" class={style.otherLoginItem} />
            </router-link>
          </div>
        </div>
        <p class={style.register}>{i18nRender('user.login.notAccount')}
          <router-link to="register">{i18nRender(
            'user.login.register')}</router-link>
        </p>
      </div>
    )
  }
})
