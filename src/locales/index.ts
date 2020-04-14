import Vue from 'vue'
import VueI18n, { LocaleMessage } from 'vue-i18n'
import VueCompositionApi, { reactive, ref } from '@vue/composition-api'
import storage from 'localforage'
import moment from 'moment'
import zhCN from './lang/zh-CN'

Vue.use(VueI18n)
Vue.use(VueCompositionApi)

export const defaultLocale: string = 'zh-cn'

const messages = {
  'zh-cn': {
    ...zhCN
  }
}

const loadedLanguages: string[] = [
  defaultLocale
]

export const langState = reactive({
  locale: ref<string>(defaultLocale),
  ant: ref<LocaleMessage>({})
})

const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages
})

export default i18n

export const i18nRender = (key: string): any => i18n.t(key)

const setI18nLanguage = (lang: string) => {
  console.log(i18n.getLocaleMessage(lang))
  i18n.locale = lang
  langState.locale = lang
  langState.ant = i18n.getLocaleMessage(lang).antLocale
  return true
}

export const loadLanguageAsync = (lang: string = defaultLocale) => {
  return new Promise(async (resolve, reject) => {
    await storage.setItem('language', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(message => {
          const locale = message.default
          i18n.setLocaleMessage(lang, locale)
          loadedLanguages.push(lang)
          langState.locale = lang
          langState.ant = locale.antLocale
          moment.updateLocale(locale.momentName, locale.momentLocale)
          return resolve(setI18nLanguage(lang))
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
