import type { TFunction } from 'i18next'
import { commonHelper } from '~/helpers'
import type { IStep } from '~/shared/models/common.model'

import { EnIcon, KoIcon, ViIcon } from '../../assets/svgs'
import { EEmployeeAccountStatus, ELanguage } from '../enums/common.enum'

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
  },
  GET_OPTIONS_EMPLOYEE_ACCOUNT_STATUS: commonHelper.getEnumOptions(EEmployeeAccountStatus, 'employeeAccountStatus'),
  GET_DATA_UPSERT_EMPLOYEE_STEP: (t: TFunction) => {
    const STEPS: IStep[] = [
      {
        title: t('stepper.upsertEmployee.personalInfo.title'),
        description: t('stepper.upsertEmployee.personalInfo.description')
      },
      {
        title: t('stepper.upsertEmployee.jobOrganization.title'),
        description: t('stepper.upsertEmployee.jobOrganization.description')
      },
      {
        title: t('stepper.upsertEmployee.contractSalary.title'),
        description: t('stepper.upsertEmployee.contractSalary.description')
      },
      {
        title: t('stepper.upsertEmployee.accountConfirmation.title'),
        description: t('stepper.upsertEmployee.accountConfirmation.description')
      }
    ]
    return STEPS
  }
}
