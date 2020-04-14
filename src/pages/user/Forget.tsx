import style from './Forget.module.less'
import { defineComponent } from '@vue/composition-api'
import { Form, Input, Button } from 'ant-design-vue'
import { i18nRender } from '@/locales'
import { FormProps } from '@/types/CommonType'
import { LoginFormState } from '@/types/FormStateType'

const LoginForm = defineComponent({
  name: 'ForgetForm',
  setup (props: FormProps) {
    const { getFieldDecorator, validateFields } = props.form
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      validateFields((err: Error[], values: LoginFormState) => {
        if (!err) {
          // console.log('Received values of form: ', values)
        }
      })
    }
    const formItemLayout = {
      labelCol: { xs: { span: 24 } },
      wrapperCol: { xs: { span: 24 } }
    }
    return () => (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={i18nRender('user.forget.email.label')} class={style.formItem}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: i18nRender('user.forget.email.regexMessage')
              }
            ]
          })(
            <Input size="large" placeholder={i18nRender('user.forget.email.placeholder')} />
          )}
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" class={style.btn}>
          {i18nRender('user.forget.submit')}
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
          <h4 class={style.title}>{i18nRender('user.forget.title')}</h4>
          <p class={style.desc}>{i18nRender('user.forget.desc')}</p>
          <LoginFormWrapper />
        </div>
        <p class={style.register}>{i18nRender('user.forget.back')}
          <router-link to="login">  {i18nRender(
            'user.forget.backBtn')}</router-link>
        </p>
      </div>
    )
  }
})
