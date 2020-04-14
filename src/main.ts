import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import Base from 'ant-design-vue/es/base'
import router from '@/router'
import i18n from '@/locales'
import App from './App'
import { useProvide } from '@/store'
import { bootstrap } from '@/hooks/useBootstrapHooks'

Vue.config.productionTip = false
Vue.use(Base)
Vue.use(VueCompositionApi)

require('../mock/index')

new Vue({
  setup () {
    useProvide()
    bootstrap()
    return {}
  },
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
