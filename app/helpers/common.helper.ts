import i18n, { type TFunction, t } from 'i18next'
import { toast } from 'sonner'
import type { TEnumLike } from '~/shared/types/common.type'

export const commonHelper = {
  copyToClipboard: async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  },

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  urlToFile: async (url: string = '', fileName: string = ''): Promise<File> => {
    const response = await fetch(url)
    const blob = await response.blob()
    const fileType = blob.type || 'application/pdf'
    return new File([blob], fileName, { type: fileType })
  },
  toCamelCase: (str: string) => {
    return str
      .replace(/_([a-zA-Z])/g, (_, char) => char.toUpperCase())
      .replace(/^([A-Z])/, (m, char) => char.toLowerCase())
  },
  convertTitleHeader: (titles: string[], t: TFunction) => {
    const mappingKey = titles?.map((title) => t(title))
    return mappingKey.join(' / ')
  },
  downloadFile: (file?: Blob, fileName: string = '', successMessage = '') => {
    if (!file) return
    try {
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()
      URL.revokeObjectURL(url)
      toast.success(successMessage)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('msg.downloadFileFailed'))
    }
  },
  downloadFileByUrl: (url?: string, fileName: string = '', successMessage = '') => {
    if (!url) return
    try {
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success(successMessage)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('msg.downloadFileFailed'))
    }
  },

  getNoTable: (page: number = 0, size: number = 0, rowIndex: number = 0) => {
    return Number(page) * Number(size) + rowIndex + 1
  },
  getAvatarColor: (seed: string = '') => {
    const COLORS = [
      'bg-red-100 text-red-700',
      'bg-orange-100 text-orange-700',
      'bg-amber-100 text-amber-700',
      'bg-lime-100 text-lime-700',
      'bg-green-100 text-green-700',
      'bg-teal-100 text-teal-700',
      'bg-cyan-100 text-cyan-700',
      'bg-blue-100 text-blue-700',
      'bg-indigo-100 text-indigo-700',
      'bg-violet-100 text-violet-700',
      'bg-fuchsia-100 text-fuchsia-700',
      'bg-pink-100 text-pink-700'
    ]
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return COLORS[hash % COLORS.length]
  },
  getInitials: (name: string = '') => {
    const words = name.trim().split(/\s+/).filter(Boolean)
    if (!words.length) return ''
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
    return words
      .slice(-2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  },
  // Locale-aware number (current UI language), "-" when missing — e.g. 12.4 → "12,4" in vi
  formatNumber: (value?: number | null, maximumFractionDigits = 1) =>
    value == null ? '-' : new Intl.NumberFormat(i18n.language, { maximumFractionDigits }).format(value),
  getEnumOptions:
    <T extends TEnumLike>(enumType: T, enumPath: string) =>
    (t: TFunction) =>
      (Object.keys(enumType) as (keyof T)[]).map((key) => ({
        label: t(`enums.${enumPath}.${commonHelper.toCamelCase(String(key))}`),
        value: enumType[key]
      }))
}
