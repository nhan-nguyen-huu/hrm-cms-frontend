import type { TFunction } from 'i18next'

import { EnIcon, KoIcon, ViIcon } from '../../assets/svgs'
import { ELanguage } from '../enums/common.enum'

export const DATA = {
  GET_LANGUAGE: (t: TFunction) => {
    return [
      {
        label: t('enums.language.vi'),
        value: ELanguage.Vi,
        icon: ViIcon
      },
      {
        label: t('enums.language.ko'),
        value: ELanguage.Ko,
        icon: KoIcon
      },
      {
        label: t('enums.language.en'),
        value: ELanguage.En,
        icon: EnIcon
      }
    ]
  }
}
