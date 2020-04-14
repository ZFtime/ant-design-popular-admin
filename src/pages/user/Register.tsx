import style from './Register.module.less'
import { defineComponent } from '@vue/composition-api'
import { Form, Input, Checkbox, Button, Divider, Icon } from 'ant-design-vue'
import { i18nRender } from '@/locales'
import { FormProps } from '@/types/CommonType'
import { RegisterFormState } from '@/types/FormStateType'

const LoginForm = defineComponent({
  name: 'RegisterForm',
  setup (props: FormProps) {
    const { getFieldDecorator, validateFields } = props.form
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      validateFields((err: Error[], values: RegisterFormState) => {
        if (!err) {
          // console.log('Received values of form: ', values)
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
        <Form.Item label={i18nRender('user.register.username.label')}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: i18nRender('user.register.username.regexMessage')
              }
            ]
          })(
            <Input size="large" placeholder={i18nRender('user.register.username.placeholder')} />
          )}
        </Form.Item>
        <Form.Item label={i18nRender('user.register.email.label')}>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: i18nRender('user.register.email.regexMessage')
              }
            ]
          })(
            <Input size="large" placeholder={i18nRender('user.register.email.placeholder')} />
          )}
        </Form.Item>
        <Form.Item label={i18nRender('user.register.password.label')}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: i18nRender('user.register.password.regexMessage')
              }
            ]
          })(
            <Input type="password" size="large" placeholder={i18nRender('user.register.password.placeholder')} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>{i18nRender('user.register.remember')}</Checkbox>)}
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" class={style.btn}>
          {i18nRender('user.register.submit')}
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
  name: 'Register',
  setup () {
    return () => (
      <div class={style.wrapper}>
        <div class={style.container}>
          <h4 class={style.title}>{i18nRender('user.register.title')}</h4>
          <p class={style.desc}>{i18nRender('user.register.desc')}</p>
          <LoginFormWrapper />
          <Divider class={style.dividerTips}>
            {i18nRender('user.register.registerMode')}
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
        <p class={style.register}>{i18nRender('user.register.notAccount')}
          <router-link to="login">{i18nRender(
            'user.register.login')}</router-link>
        </p>
      </div>
    )
  }
})
