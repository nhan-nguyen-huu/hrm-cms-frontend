import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { enTranslations, koTranslations, viTranslations } from '~/locales'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { ELanguage } from '~/shared/enums/common.enum'

const resources = {
  vi: {
    translation: viTranslations
  },
  en: {
    translation: enTranslations
  },
  ko: {
    translation: koTranslations
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: COMMON_CONSTANT.LOCALES.KO,
    resources,
    supportedLngs: [ELanguage.Ko, ELanguage.En, ELanguage.Vi],
    fallbackLng: COMMON_CONSTANT.LOCALES.EN,
    debug: false,
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
