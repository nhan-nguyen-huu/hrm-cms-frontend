import type { TFunction } from 'i18next'
import { commonHelper } from '~/helpers'
import { ROUTES } from '~/shared/constants/routes.constant'
import type { IBreadcrumbItem, IInfoRow, IStep, ITabItem } from '~/shared/models/common.model'
import type { IProjectAllocationSummary } from '~/shared/models/project.model'

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

const ORGANIZATION_PATH = `/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.ORGANIZATION_MGT.BASE}`

// Breadcrumbs, declared in one place: single segments (ORGANIZATION, PROJECT, CURRENT) and
// per-page breadcrumbs composed from them (PROJECT_DETAIL…) — pass a page entry to <BreadcrumbCustom items />
export const BREADCRUMB_SEGMENT = {
  ORGANIZATION: (t: TFunction): Required<IBreadcrumbItem> => ({
    key: 'organization',
    label: t('sidebarMenu.organizationMgt.base'),
    to: ORGANIZATION_PATH
  }),
  PROJECT: (t: TFunction): Required<IBreadcrumbItem> => ({
    key: 'project',
    label: t('sidebarMenu.organizationMgt.project'),
    to: `${ORGANIZATION_PATH}/${ROUTES.DASHBOARD.ORGANIZATION_MGT.PROJECT}`
  }),
  // Current page — last item, not a link
  CURRENT: (label?: string): IBreadcrumbItem => ({ key: 'current', label }),

  PROJECT_DETAIL: (t: TFunction, projectName?: string): IBreadcrumbItem[] => [
    BREADCRUMB_SEGMENT.ORGANIZATION(t),
    BREADCRUMB_SEGMENT.PROJECT(t),
    BREADCRUMB_SEGMENT.CURRENT(projectName)
  ]
}

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
    const { DEPARTMENT } = ROUTES.DASHBOARD.ORGANIZATION_MGT
    const TABS: ITabItem[] = [
      {
        key: DEPARTMENT,
        label: t('sidebarMenu.organizationMgt.department'),
        to: `${ORGANIZATION_PATH}/${DEPARTMENT}`,
        // TODO: enable once the Department screen is implemented
        disabled: true
      },
      BREADCRUMB_SEGMENT.PROJECT(t)
    ]
    return TABS
  },
  // Rows of the "Staff allocation" card on the project detail page
  GET_PROJECT_ALLOCATION_ROWS: (t: TFunction, summary?: IProjectAllocationSummary) => {
    const ROWS: IInfoRow[] = [
      {
        label: t('inputLabel.memberCount'),
        value: summary?.memberCount == null ? '-' : t('common.personCount', { count: summary.memberCount })
      },
      {
        label: t('inputLabel.fteEquivalent'),
        value: summary?.fte == null ? '-' : t('common.fteValue', { value: commonHelper.formatNumber(summary.fte) })
      },
      {
        label: t('inputLabel.averageAllocation'),
        value: summary?.averageAllocation == null ? '-' : `${commonHelper.formatNumber(summary.averageAllocation)}%`
      }
    ]
    return ROWS
  }
}
