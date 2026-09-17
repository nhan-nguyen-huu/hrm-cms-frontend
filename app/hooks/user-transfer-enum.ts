import { useTranslation } from 'react-i18next'
import { commonHelper } from '~/helpers'
import type { TEnumLike, TGetTranslateEnum } from '~/shared/types/common.type'

export const useTransferEnum = () => {
  const { t } = useTranslation()
  const getTranslateEnum = <T extends TEnumLike>({ enumPath, enumType, value = '' }: TGetTranslateEnum<T>): string => {
    const entry = Object.entries(enumType).find(([, val]) => val === value)
    if (!entry) return '-'
    const key = commonHelper.toCamelCase(entry[0])
    return t(`enums.${enumPath}.${key}`)
  }

  return { getTranslateEnum }
}
