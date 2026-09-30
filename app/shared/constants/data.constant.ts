import type { TFunction } from 'i18next'
import { DATE_FORMAT_SLASH, DATE_TIME_FORMAT_DAY_MONTH, commonHelper, dateHelper } from '~/helpers'
import type { TGetTranslateEnumFn } from '~/hooks/user-transfer-enum'
import { ROUTES } from '~/shared/constants/routes.constant'
import type {
  IBreadcrumbItem,
  IFilterTabItem,
  IInfoRow,
  IOption,
  IStatCardItem,
  IStep,
  ITabItem
} from '~/shared/models/common.model'
import type { IOverviewSummary } from '~/shared/models/overview.model'
import type {
  IAllocationCheckRow,
  IProject,
  IProjectAllocationSummary,
  IProjectMemberCandidate
} from '~/shared/models/project.model'
import type { IRequest } from '~/shared/models/request.model'

import { EnIcon, KoIcon, ViIcon } from '../../assets/svgs'
import {
  EDepartment,
  EEmployeeProfileTab,
  EEmployeeStatus,
  EGender,
  ELanguage,
  EMaritalStatus,
  ENationality,
  EProjectStatus,
  ERequestStatus,
  ERequestStatusFilter
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
  GET_OPTIONS_EMPLOYEE_STATUS: commonHelper.getEnumOptions(EEmployeeStatus, 'employeeStatus'),
  GET_OPTIONS_EMPLOYEE_PROFILE_TAB: commonHelper.getEnumOptions(EEmployeeProfileTab, 'employeeProfileTab'),
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
  },
  // Employee select of the "add member" dialog: "Đinh Thu Trâm · NV0175 · Kỹ thuật"
  GET_OPTIONS_PROJECT_MEMBER_CANDIDATE: (
    candidates: IProjectMemberCandidate[],
    getTranslateEnum: TGetTranslateEnumFn
  ): IOption[] =>
    candidates.map((candidate) => ({
      value: candidate.id,
      label: [
        candidate.name,
        candidate.code,
        candidate.department &&
          getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: candidate.department })
      ]
        .filter(Boolean)
        .join(' · ')
    })),
  // Allocation check of the "add member" dialog: the employee's other projects + this project
  GET_ALLOCATION_CHECK_ROWS: (
    t: TFunction,
    project?: IProject,
    candidate?: IProjectMemberCandidate,
    allocation?: number
  ) => {
    const ROWS: IAllocationCheckRow[] = [
      ...(candidate?.allocations ?? []).map((item, index) => ({
        key: item.projectId ?? String(index),
        label: [item.projectName, item.projectCode].filter(Boolean).join(' · '),
        allocation: item.allocation ?? 0
      })),
      {
        key: 'current',
        label: t('msg.thisProject', { name: [project?.name, project?.code].filter(Boolean).join(' · ') }),
        allocation: allocation ?? 0,
        isCurrent: true
      }
    ]
    return ROWS
  },
  // Status tabs of the request list: "Chờ duyệt · 14", "Đã duyệt · 86", "Từ chối · 4", "Tất cả"
  GET_REQUEST_STATUS_TABS: (t: TFunction, counts: Partial<Record<ERequestStatusFilter, number>>) => {
    const TABS: IFilterTabItem[] = commonHelper
      .getEnumOptions(
        ERequestStatusFilter,
        'requestStatusFilter'
      )(t)
      .map(({ label, value }) => ({
        key: value,
        label,
        // "Tất cả" has no counter in the design
        count: value === ERequestStatusFilter.All ? undefined : counts[value]
      }))
    return TABS
  },
  // Tiles of the request detail: dates · leave days · leave balance; tiles without data are skipped
  GET_REQUEST_DETAIL_ROWS: (t: TFunction, request?: IRequest) => {
    const formatDays = (days?: number) => commonHelper.formatNumber(days, 1, 1)
    const isRange = !!request?.toDate && request.toDate !== request.fromDate
    const ROWS: (IInfoRow | false)[] = [
      {
        label: t(isRange ? 'inputLabel.fromDate' : 'inputLabel.requestDate'),
        value: dateHelper.formatDate(request?.fromDate, DATE_FORMAT_SLASH, '-')
      },
      isRange && { label: t('inputLabel.toDate'), value: dateHelper.formatDate(request?.toDate, DATE_FORMAT_SLASH) },
      request?.days != null && {
        label: t('inputLabel.leaveDays'),
        value: t('common.dayCount', { value: formatDays(request.days) })
      },
      request?.leaveBalanceBefore != null &&
        request?.leaveBalanceAfter != null && {
          label: t('inputLabel.remainingLeave'),
          value: t('common.leaveBalanceChange', {
            from: formatDays(request.leaveBalanceBefore),
            to: formatDays(request.leaveBalanceAfter)
          })
        }
    ]
    return ROWS.filter((row): row is IInfoRow => !!row)
  },
  // Approval progress: line manager → HR → timesheet update
  GET_REQUEST_APPROVAL_STEPS: (t: TFunction, request?: IRequest) => {
    const formatTime = (date?: string) => dateHelper.formatDate(date, DATE_TIME_FORMAT_DAY_MONTH, '-')
    const status = request?.status
    // Rejected before reaching HR (no HR review) = rejected by the line manager
    const isRejectedByManager = status === ERequestStatus.Rejected && !request?.hrReviewedAt
    const getManagerDescription = () => {
      if (!status) return ''
      if (status === ERequestStatus.PendingManager) return t('common.waitingManagerApproval')
      const time = formatTime(request?.managerReviewedAt)
      return isRejectedByManager ? t('common.rejectedAt', { time }) : t('common.approvedAt', { time })
    }
    const getHrDescription = () => {
      if (status === ERequestStatus.PendingHr) return t('common.waitingYourApproval')
      if (status === ERequestStatus.Approved) return t('common.approvedAt', { time: formatTime(request?.hrReviewedAt) })
      if (status === ERequestStatus.Rejected && !isRejectedByManager)
        return t('common.rejectedAt', { time: formatTime(request?.hrReviewedAt) })
      return ''
    }
    const STEPS: IStep[] = [
      { title: request?.manager?.name || t('title.lineManager'), description: getManagerDescription() },
      { title: t('title.hrDepartment'), description: getHrDescription() },
      { title: t('title.updateTimesheet') }
    ]
    return STEPS
  },
  // KPI cards of the HR overview (design screen CmsTongQuan)
  GET_OVERVIEW_STATS: (t: TFunction, summary?: IOverviewSummary) => {
    const active = summary?.activeEmployeeCount
    const present = summary?.presentTodayCount
    const presentRate = active && present != null ? (present / active) * 100 : undefined
    const overdue = summary?.overdueRequestCount ?? 0
    const STATS: IStatCardItem[] = [
      {
        key: 'activeEmployees',
        label: t('title.activeEmployees'),
        value: commonHelper.formatNumber(active, 0),
        change: summary?.headcountChange,
        note: t('msg.hiresAndResignationsThisMonth', {
          hires: summary?.newHireCount ?? 0,
          resignations: summary?.resignationCount ?? 0
        })
      },
      {
        key: 'presentToday',
        label: t('title.presentToday'),
        value: commonHelper.formatNumber(present, 0),
        unit: t('common.outOfWithRate', {
          total: commonHelper.formatNumber(active, 0),
          rate: commonHelper.formatNumber(presentRate, 1)
        }),
        progress: presentRate
      },
      {
        key: 'pendingRequests',
        label: t('title.pendingRequests'),
        value: commonHelper.formatNumber(summary?.pendingRequestCount, 0),
        unit: t('common.requestUnit'),
        note: overdue ? t('msg.overdueRequests', { count: overdue, days: summary?.overdueAfterDays ?? 0 }) : undefined,
        tone: 'warning',
        noteTone: 'warning'
      },
      {
        key: 'expiringContracts',
        label: t('title.expiringContracts'),
        value: commonHelper.formatNumber(summary?.expiringContractCount, 0),
        unit: t('common.recordUnit'),
        note: t('msg.withinNextDays', { days: summary?.expiringWithinDays ?? 0 }),
        tone: 'danger'
      }
    ]
    return STATS
  }
}
