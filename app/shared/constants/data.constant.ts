import type { TFunction } from 'i18next'
import { commonHelper } from '~/helpers'
import { ROUTES } from '~/shared/constants/routes.constant'
import type { IStep, ITabItem } from '~/shared/models/common.model'

import { EnIcon, KoIcon, ViIcon } from '../../assets/svgs'
import {
  EDepartment,
  EEmployeeAccountStatus,
  EGender,
  ELanguage,
  EMaritalStatus,
  ENationality,
  EProjectStatus
} from '../enums/common.enum'

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
  },
  GET_OPTIONS_GENDER: commonHelper.getEnumOptions(EGender, 'gender'),
  GET_OPTIONS_MARITALSTATUS: commonHelper.getEnumOptions(EMaritalStatus, 'maritalStatus'),
  GET_OPTIONS_NATIONLITY: commonHelper.getEnumOptions(ENationality, 'nationality'),
  GET_OPTIONS_PROJECT_STATUS: commonHelper.getEnumOptions(EProjectStatus, 'projectStatus'),
  GET_OPTIONS_DEPARTMENT: commonHelper.getEnumOptions(EDepartment, 'department'),
  GET_ORGANIZATION_TABS: (t: TFunction) => {
    const BASE_PATH = `/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.ORGANIZATION_MGT.BASE}`
    const { DEPARTMENT, PROJECT } = ROUTES.DASHBOARD.ORGANIZATION_MGT
    const TABS: ITabItem[] = [
      {
        key: DEPARTMENT,
        label: t('sidebarMenu.organizationMgt.department'),
        to: `${BASE_PATH}/${DEPARTMENT}`,
        // TODO: enable once the Department screen is implemented
        disabled: true
      },
      {
        key: PROJECT,
        label: t('sidebarMenu.organizationMgt.project'),
        to: `${BASE_PATH}/${PROJECT}`
      }
    ]
    return TABS
  }
}
