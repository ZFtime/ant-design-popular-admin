import { reactive } from '@vue/composition-api'
import { LoginFormState } from '@/types/FormStateType'
import storage from 'localforage'
import { welcome } from '@/utils/util'

export const userState = reactive({
  token: '',
  name: '',
  welcome: '',
  avatar: '',
  role: '',
  info: {},
  // key count
  noticeList: []
})
/**
 * 登录 设置token
 * @param form
 * @constructor
 */
export const Login = (form: LoginFormState) => {
  return new Promise((resolve, reject) => {
    // TODO: 调用登录接口 获取token
    setTimeout(async () => {
      await storage.setItem('ACCOUNT_TOKEN', form.email)
      userState.token = form.email
      resolve()
    }, 3000)
  })
}

export const GetInfo = () => {
  return new Promise((resolve, reject) => {
    // TODO: 调用获取用户信息接口
    setTimeout(() => {
      userState.info = {
        name: 'beFleeting',
        avatar: 'http://b-ssl.duitang.com/uploads/item/201708/09/20170809211015_yckmz.thumb.700_0.jpeg',
        welcome: welcome()
      }
      userState.role = 'admin'
      userState.name = 'beFleeting'
      userState.avatar = 'http://b-ssl.duitang.com/uploads/item/201708/09/20170809211015_yckmz.thumb.700_0.jpeg'
      userState.welcome = welcome()
      resolve()
    }, 100)
  })
}
export const Logout = () => {
  return new Promise((resolve, reject) => {
    // TODO:调用退出接口清空相关数据
    setTimeout(async () => {
      userState.token = ''
      userState.role = ''
      await storage.removeItem('ACCOUNT_TOKEN')
      resolve()
    }, 1000)
  })
}
