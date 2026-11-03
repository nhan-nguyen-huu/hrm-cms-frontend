import type { TFunction } from 'i18next'
import { DATE_FORMAT_SLASH, DATE_TIME_FORMAT_DAY_MONTH, commonHelper, dateHelper, fortmatHelper } from '~/helpers'
import type { TGetTranslateEnumFn } from '~/hooks/user-transfer-enum'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { ROUTES } from '~/shared/constants/routes.constant'
import type {
  IBreadcrumbItem,
  IFilterTabItem,
  IInfoRow,
  IInfoSection,
  IOption,
  IStatCardItem,
  IStep,
  ITabItem
} from '~/shared/models/common.model'
import type { IEmployee, IEmployeeDocument, IOrgEvent } from '~/shared/models/employee.model'
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
  EEducationLevel,
  EEmployeeDocumentStatus,
  EEmployeeDocumentType,
  EEmployeeProfileDetailTab,
  EEmployeeProfileTab,
  EEmployeeStatus,
  EGender,
  ELanguage,
  EMaritalStatus,
  ENationality,
  EOnboardingStep,
  EOrgEventType,
  EProjectStatus,
  ERelationship,
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
  EMPLOYEE_PROFILE: (t: TFunction): Required<IBreadcrumbItem> => ({
    key: 'employeeProfile',
    label: t('sidebarMenu.employeeMgt.employeeProfile'),
    to: `/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE}`
  }),
  // Current page — last item, not a link
  CURRENT: (label?: string): IBreadcrumbItem => ({ key: 'current', label }),

  EMPLOYEE_PROFILE_DETAIL: (t: TFunction, employeeName?: string): IBreadcrumbItem[] => [
    BREADCRUMB_SEGMENT.EMPLOYEE_PROFILE(t),
    BREADCRUMB_SEGMENT.CURRENT(employeeName)
  ],
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
  GET_OPTIONS_ONBOARDING_STEP: commonHelper.getEnumOptions(EOnboardingStep, 'onboardingStep'),
  GET_OPTIONS_EMPLOYEE_PROFILE_TAB: commonHelper.getEnumOptions(EEmployeeProfileTab, 'employeeProfileTab'),
  GET_OPTIONS_EMPLOYEE_PROFILE_DETAIL_TAB: commonHelper.getEnumOptions(
    EEmployeeProfileDetailTab,
    'employeeProfileDetailTab'
  ),
  GET_DATA_UPSERT_EMPLOYEE_STEP: (t: TFunction) => {
    const STEPS: IStep[] = [
      {
        title: t('stepper.upsertEmployee.personalInfo.title'),
        description: t('stepper.upsertEmployee.personalInfo.description'),
        key: EOnboardingStep.Personal
      },
      {
        title: t('stepper.upsertEmployee.jobOrganization.title'),
        description: t('stepper.upsertEmployee.jobOrganization.description'),
        key: EOnboardingStep.Job
      },
      {
        title: t('stepper.upsertEmployee.contractSalary.title'),
        description: t('stepper.upsertEmployee.contractSalary.description'),
        key: EOnboardingStep.Contract
      },
      {
        title: t('stepper.upsertEmployee.accountConfirmation.title'),
        description: t('stepper.upsertEmployee.accountConfirmation.description'),
        key: EOnboardingStep.Account
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
  },
  // Info cards of the "Thông tin cá nhân" tab (design CmsHoSoThongTin); empty values render as "not updated"
  GET_EMPLOYEE_PERSONAL_INFO_SECTIONS: (t: TFunction, getTranslateEnum: TGetTranslateEnumFn, employee?: IEmployee) => {
    const formatDate = (date?: string) => dateHelper.formatDate(date, DATE_FORMAT_SLASH) || undefined
    // Translated label of a code, or the API value as-is when the code is unknown (e.g. nationality "Vietnam")
    const enumText = (enumPath: string, enumType: Record<string, string>, value?: string) => {
      if (!value) return undefined
      const text = getTranslateEnum({ enumPath, enumType, value })
      return text === '-' ? value : text
    }
    const age = dateHelper.getYearsSince(employee?.dateOfBirth)
    const dateOfBirth = formatDate(employee?.dateOfBirth)
    const education = employee?.education
    const SECTIONS: IInfoSection[] = [
      {
        key: 'basic',
        title: t('title.basicInfo'),
        fields: [
          { key: 'fullName', label: t('inputLabel.fullName'), value: employee?.fullName },
          {
            key: 'dateOfBirth',
            label: t('inputLabel.birthDate'),
            value: dateOfBirth && t('common.dateWithAge', { date: dateOfBirth, age })
          },
          { key: 'gender', label: t('inputLabel.gender'), value: enumText('gender', EGender, employee?.gender) },
          {
            key: 'maritalStatus',
            label: t('inputLabel.maritalStatus'),
            value: enumText('maritalStatus', EMaritalStatus, employee?.maritalStatus)
          },
          {
            key: 'nationality',
            label: t('inputLabel.nationality'),
            value: enumText('nationality', ENationality, employee?.nationality)
          },
          { key: 'placeOfBirth', label: t('inputLabel.placeOfBirth'), value: employee?.placeOfBirth }
        ]
      },
      {
        key: 'identity',
        title: t('title.identityDocuments'),
        fields: [
          { key: 'idCardNumber', label: t('inputLabel.cccdNumber'), value: employee?.idCardNumber },
          {
            key: 'idCardIssuedDate',
            label: t('inputLabel.dateOfIssue'),
            value: formatDate(employee?.idCardIssuedDate)
          },
          { key: 'idCardIssuedPlace', label: t('inputLabel.placeOfIssue'), value: employee?.idCardIssuedPlace },
          { key: 'taxCode', label: t('inputLabel.taxCode'), value: employee?.taxCode },
          {
            key: 'socialInsuranceNumber',
            label: t('inputLabel.socialInsuranceNumber'),
            value: employee?.socialInsuranceNumber
          },
          {
            key: 'healthInsuranceNumber',
            label: t('inputLabel.healthInsuranceNumber'),
            value: employee?.healthInsuranceNumber
          }
        ]
      },
      {
        key: 'contact',
        title: t('title.contactAndAddress'),
        fields: [
          { key: 'phone', label: t('inputLabel.phoneNumber'), value: employee?.phone },
          { key: 'personalEmail', label: t('inputLabel.personalEmail'), value: employee?.personalEmail },
          { key: 'email', label: t('inputLabel.companyEmail'), value: employee?.email },
          {
            key: 'permanentAddress',
            label: t('inputLabel.permanentAddress'),
            value: employee?.permanentAddress,
            colSpan: 3
          },
          {
            key: 'currentAddress',
            label: t('inputLabel.currentResidence'),
            value: employee?.currentAddress,
            colSpan: 3
          },
          {
            key: 'emergencyContactName',
            label: t('inputLabel.emergencyContact'),
            value: employee?.emergencyContactName
          },
          {
            key: 'emergencyContactRelation',
            label: t('inputLabel.relationship'),
            value: enumText('relationship', ERelationship, employee?.emergencyContactRelation)
          },
          {
            key: 'emergencyContactPhone',
            label: t('inputLabel.emergencyPhoneNumber'),
            value: employee?.emergencyContactPhone
          }
        ]
      },
      {
        key: 'education',
        title: t('title.education'),
        fields: [
          {
            key: 'educationLevel',
            label: t('inputLabel.educationLevel'),
            value: enumText('educationLevel', EEducationLevel, education?.level)
          },
          { key: 'major', label: t('inputLabel.major'), value: education?.major },
          { key: 'school', label: t('inputLabel.school'), value: education?.school },
          {
            key: 'graduationYear',
            label: t('inputLabel.graduationYear'),
            value: education?.graduationYear?.toString()
          },
          { key: 'foreignLanguage', label: t('inputLabel.foreignLanguage'), value: education?.foreignLanguage },
          { key: 'certificate', label: t('inputLabel.certificate'), value: education?.certificate }
        ]
      }
    ]
    return SECTIONS
  },
  // Filter of the "Tài liệu" tab (with "All")
  GET_OPTIONS_EMPLOYEE_DOCUMENT_TYPE: commonHelper.getEnumOptions(EEmployeeDocumentType, 'employeeDocumentType'),
  // Upload form: every type except the "All" filter value
  GET_OPTIONS_EMPLOYEE_DOCUMENT_TYPE_UPLOAD: (t: TFunction) =>
    commonHelper
      .getEnumOptions(
        EEmployeeDocumentType,
        'employeeDocumentType'
      )(t)
      .filter((option) => option.value !== EEmployeeDocumentType.All),
  GET_OPTIONS_ORG_EVENT_TYPE: commonHelper.getEnumOptions(EOrgEventType, 'orgEventType'),
  // People who appear in the events of this employee, plus "All"
  GET_OPTIONS_EVENT_ACTOR: (t: TFunction, events: IOrgEvent[]) => {
    const actors = [...new Set(events.map((event) => event.actorFullName).filter(Boolean))] as string[]
    const OPTIONS: IOption[] = [
      { label: t('common.allActors'), value: COMMON_CONSTANT.FILTER_ALL },
      ...actors.map((actor) => ({ label: actor, value: actor }))
    ]
    return OPTIONS
  },
  GET_OPTIONS_EMPLOYEE_DOCUMENT_STATUS: commonHelper.getEnumOptions(EEmployeeDocumentStatus, 'employeeDocumentStatus'),
  // "Thống kê" card of the documents tab, computed from the document list
  GET_EMPLOYEE_DOCUMENT_STATS: (t: TFunction, documents: IEmployeeDocument[]) => {
    const count = (types: EEmployeeDocumentType[]) =>
      documents.filter((document) => document.documentType && types.includes(document.documentType)).length
    const totalSize = documents.reduce((sum, document) => sum + (document.fileSize ?? 0), 0)
    const ROWS: IInfoRow[] = [
      { label: t('common.totalDocuments'), value: t('common.fileCount', { count: documents.length }) },
      { label: t('common.totalSize'), value: fortmatHelper.formatFileSize(totalSize) },
      {
        label: t('enums.employeeDocumentType.signedContract'),
        value: t('common.fileCount', { count: count([EEmployeeDocumentType.SignedContract]) })
      },
      {
        label: t('common.idAndQualificationDocuments'),
        value: t('common.fileCount', {
          count: count([EEmployeeDocumentType.IdCard, EEmployeeDocumentType.Qualification])
        })
      },
      {
        label: t('common.recruitmentAndOtherDocuments'),
        value: t('common.fileCount', {
          count: count([EEmployeeDocumentType.Cv, EEmployeeDocumentType.Decision, EEmployeeDocumentType.Other])
        })
      }
    ]
    return ROWS
  }
}
