import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import storage from 'localforage'
import { notification } from 'ant-design-vue'
import { Logout } from '@/hooks/useUserHooks'

const service = axios.create({
  baseURL: process.env.VUE_API_BASE_URL,
  timeout: 5000
})

const err = async (error: AxiosError) => {
  if (error.response) {
    const data = error.response.data
    const token = await storage.getItem('token')
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        Logout().finally(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await storage.getItem('token')
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, err)

service.interceptors.response.use((response: AxiosRequestConfig) => {
  return response.data
}, err)

export default service
