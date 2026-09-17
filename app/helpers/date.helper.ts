import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import i18n from 'i18next'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const TIME_FORMAT = 'HH:mm'
export const DATE_TIME_FORMAT_FULL = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT_DOT = 'YYYY.MM.DD'
export const DATE_TIME_FORMAT_DOT = 'YYYY.MM.DD HH:mm'
export const DATE_FORMAT_DOT_FULL = 'YYYY.MM.DD HH:mm'

export const dateHelper = {
  formatDate: (date?: Date | string | dayjs.Dayjs, formatString: string = DATE_FORMAT, textFallback = '') => {
    if (!date) return textFallback
    return dayjs(date).format(formatString)
  },

  formatDateToMonth: (date?: Date | string | dayjs.Dayjs, textFallback = '-') => {
    if (!date) return textFallback
    return dayjs(date).locale(i18n.language).format('MMM')
  },

  formatFromToDate: (
    fromDate?: Date | string | dayjs.Dayjs,
    toDate?: Date | string | dayjs.Dayjs,
    formatString: string = DATE_FORMAT
  ) => {
    if (!fromDate || !toDate) return ''
    return `${dayjs(fromDate).format(formatString)} ~ ${dayjs(toDate).format(formatString)}`
  },

  formatDateNotification: (date?: Date | string | dayjs.Dayjs, textFallback = '') => {
    if (!date) return textFallback
    const target = dayjs(date)
    return target.locale(i18n.language).fromNow()
  }
}
