import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import JobEmployeeForm from '~/components/forms/employee/job-employee-form'
import PersonalEmployeeForm from '~/components/forms/employee/personal-employee-form'
import SkelethonLoading from '~/components/loading/skelethon-loading'
import { DATE_FORMAT, commonHelper } from '~/helpers'
import { formHelper } from '~/helpers/form.helper'
import {
  type TJobEmployeeSchema,
  type TPersonalEmployeeSchema,
  getJobEmployeeSchema,
  getPersonalEmployeeSchema
} from '~/helpers/schemas/employee-schema.helper'
import { useGetInfoEmployeeDraftApi } from '~/hooks/apis/use-employee-api'
import useMutationApi from '~/hooks/use-mutation-api'
import useQueryParams from '~/hooks/use-query-params'
import ActionUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/action-upsert-employee'
import HeaderUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/header-upsert-employee'
import { EmployeeService } from '~/services/employee.service'
import { ROUTES } from '~/shared/constants/routes.constant'
import { EGender, EMaritalStatus, ENationality, EOnboardingStep } from '~/shared/enums/common.enum'
import { EJobEmployeeFormKey, EPersonalEmployeeFormKey } from '~/shared/enums/form.enum'
import type { eScreenMode } from '~/shared/models/common.model'
import type { IJob, IPersonal } from '~/shared/models/employee.model'

interface IUpsertEmployeeProps {
  screenMode: eScreenMode
}

type TSaveStepVariables =
  { step: EOnboardingStep.Personal; payload: IPersonal } | { step: EOnboardingStep.Job; payload: IJob }

const UpsertEmployee = ({ screenMode }: IUpsertEmployeeProps) => {
  console.log(screenMode)
  const { t } = useTranslation()
  const { searchParams, updateQueries } = useQueryParams()
  const id = searchParams.get('id') ?? ''
  const activeStepParam = (searchParams.get('step') as EOnboardingStep) ?? EOnboardingStep.Personal
  const [activeStep, setActiveStep] = useState<EOnboardingStep>(activeStepParam)
  const { activeStepKey } = commonHelper.getOnboardingStep(activeStep)
  const navi = useNavigate()

  // Api infor employee draft
  const {
    data: dataInfoEmployeeDraft,
    isLoading: isLoadingDataInfoEmployeeDraft,
    isRefetching: isRefetchingDataInfoEmployeeDraft
  } = useGetInfoEmployeeDraftApi({
    id: Number(id),
    options: {
      enabled: !!id
    }
  })

  // Personal employee form
  const personalEmployeeSchema = getPersonalEmployeeSchema(t)
  const personalEmployeeForm = useForm<TPersonalEmployeeSchema>({
    resolver: zodResolver(personalEmployeeSchema),
    defaultValues: formHelper.getDefaultValuesPersonalEmployee(),
    mode: 'all'
  })

  // Job employee form
  const jobEmployeeSchema = getJobEmployeeSchema(t)
  const jobEmployeeForm = useForm<TJobEmployeeSchema>({
    resolver: zodResolver(jobEmployeeSchema),
    defaultValues: formHelper.getDefaultValuesJobEmployee(),
    mode: 'all'
  })

  // Action
  const handleCancel = () => {
    navi(
      `/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE}`
    )
  }

  const handleBack = () => {
    const { prevStepKey } = commonHelper.getOnboardingStep(activeStep)
    setActiveStep(prevStepKey)
    updateQueries({
      step: prevStepKey
    })
  }

  const saveStepMutation = useMutationApi({
    mutationFn: (variables: TSaveStepVariables) => {
      switch (variables.step) {
        case EOnboardingStep.Personal:
          return EmployeeService.SavePersonalStep(variables.payload)
        case EOnboardingStep.Job:
          return EmployeeService.SaveJobStep(variables.payload)
      }
    },
    onSuccess: (res, variables) => {
      const isSuccess = res?.result
      if (isSuccess) {
        const { nextStepKey } = commonHelper.getOnboardingStep(variables.step)
        setActiveStep(nextStepKey)
        updateQueries({
          step: nextStepKey,
          id: res?.data?.id
        })
      }
    }
  })

  const handleSavePersonal = () => {
    const formValues = personalEmployeeForm.getValues()
    const payload: IPersonal = {
      ...formValues,
      id: id ? Number(id) : undefined,
      dateOfBirth: formValues?.dateOfBirth
        ? dayjs(formValues?.dateOfBirth).startOf('day').format(DATE_FORMAT)
        : undefined,
      idCardIssuedDate: formValues?.idCardIssuedDate
        ? dayjs(formValues?.idCardIssuedDate).startOf('day').format(DATE_FORMAT)
        : undefined,
      idCardIssuedPlace: formValues?.idCardIssuedPlace
        ? dayjs(formValues?.idCardIssuedPlace).startOf('day').format(DATE_FORMAT)
        : undefined,
      dependentCount: formValues?.dependentCount ? Number(formValues?.dependentCount) : undefined
    }
    saveStepMutation.mutate({ step: EOnboardingStep.Personal, payload })
  }

  const handleSaveJob = () => {
    const formValues = jobEmployeeForm.getValues()
    const payload: IJob = {
      ...formValues,
      id: id ? Number(id) : undefined,
      departmentId: formValues?.departmentId ? Number(formValues?.departmentId) : undefined,
      projectId: formValues?.projectId ? Number(formValues?.projectId) : undefined,
      jobTitleId: formValues?.jobTitleId ? Number(formValues?.jobTitleId) : undefined,
      jobGradeId: formValues?.jobGradeId ? Number(formValues?.jobGradeId) : undefined,
      lineManagerId: formValues?.lineManagerId ? Number(formValues?.lineManagerId) : undefined,
      startDate: formValues?.startDate ? dayjs(formValues?.startDate).startOf('day').format(DATE_FORMAT) : undefined,
      annualLeaveDays: formValues?.annualLeaveDays ? Number(formValues?.annualLeaveDays) : undefined,
      officeId: formValues?.officeId ? Number(formValues?.officeId) : undefined
    }
    saveStepMutation.mutate({ step: EOnboardingStep.Job, payload })
  }

  const handleContinue = () => {
    switch (activeStep) {
      case EOnboardingStep.Personal:
        handleSavePersonal()
        break
      case EOnboardingStep.Job:
        handleSaveJob()
        break
    }
  }

  const handleGetDisabledContinueAction = () => {
    switch (activeStep) {
      case EOnboardingStep.Personal:
        return !personalEmployeeForm.formState.isValid
      case EOnboardingStep.Job:
        return !jobEmployeeForm.formState.isValid
      default:
        return true
    }
  }

  const handleParsePersonalForm = () => {
    if (!id || !dataInfoEmployeeDraft?.payload?.personal) return
    const personal = dataInfoEmployeeDraft?.payload?.personal
    personalEmployeeForm.reset({
      [EPersonalEmployeeFormKey.FullName]: personal?.fullName ?? '',
      [EPersonalEmployeeFormKey.DateOfBirth]: personal?.dateOfBirth ? new Date(personal.dateOfBirth) : undefined,
      [EPersonalEmployeeFormKey.Gender]: personal?.gender ?? EGender.Male,
      [EPersonalEmployeeFormKey.IdCardNumber]: personal?.idCardNumber ?? '',
      [EPersonalEmployeeFormKey.IdCardIssuedDate]: personal?.idCardIssuedDate
        ? new Date(personal.idCardIssuedDate)
        : undefined,
      [EPersonalEmployeeFormKey.IdCardIssuedPlace]: personal?.idCardIssuedPlace ?? '',
      [EPersonalEmployeeFormKey.Phone]: personal?.phone ?? '',
      [EPersonalEmployeeFormKey.PersonalEmail]: personal?.personalEmail ?? '',
      [EPersonalEmployeeFormKey.PermanentAddress]: personal?.permanentAddress ?? '',
      [EPersonalEmployeeFormKey.CurrentAddress]: personal?.currentAddress ?? '',
      [EPersonalEmployeeFormKey.EmergencyContact]: personal?.emergencyContact ?? '',
      [EPersonalEmployeeFormKey.MaritalStatus]: personal?.maritalStatus ?? EMaritalStatus.Single,
      [EPersonalEmployeeFormKey.Nationality]: personal?.nationality ?? ENationality.Vi,
      [EPersonalEmployeeFormKey.DependentCount]: String(personal?.dependentCount ?? ''),
      [EPersonalEmployeeFormKey.Avatar]: undefined
    })
  }

  const handleParseJobForm = () => {
    if (!id || !dataInfoEmployeeDraft?.payload?.job) return
    const job = dataInfoEmployeeDraft?.payload?.job
    jobEmployeeForm.reset({
      [EJobEmployeeFormKey.DepartmentId]: String(job?.departmentId ?? ''),
      [EJobEmployeeFormKey.ProjectId]: String(job?.projectId ?? ''),
      [EJobEmployeeFormKey.JobTitleId]: String(job?.jobTitleId ?? ''),
      [EJobEmployeeFormKey.JobGradeId]: String(job?.jobGradeId ?? ''),
      [EJobEmployeeFormKey.LineManagerId]: String(job?.lineManagerId ?? ''),
      [EJobEmployeeFormKey.StartDate]: job?.startDate ? new Date(job.startDate) : undefined,
      [EJobEmployeeFormKey.EmploymentType]: job?.employmentType,
      [EJobEmployeeFormKey.OfficeId]: String(job?.officeId ?? ''),
      [EJobEmployeeFormKey.WorkShift]: job?.workShift,
      [EJobEmployeeFormKey.AnnualLeaveDays]: String(job?.annualLeaveDays ?? '')
    })
  }

  const handleParseFormByStep = () => {
    switch (activeStep) {
      case EOnboardingStep.Personal:
        handleParsePersonalForm()
        break
      case EOnboardingStep.Job:
        handleParseJobForm()
        break
    }
  }

  useEffect(() => {
    updateQueries({
      step: activeStepKey
    })
  }, [])

  useEffect(() => {
    if (dataInfoEmployeeDraft?.payload) {
      handleParseFormByStep()
    }
  }, [dataInfoEmployeeDraft])

  return (
    <>
      {/* Header */}
      <HeaderUpsertEmployee activeStep={activeStep} />

      {/* Form */}
      <SkelethonLoading loading={isLoadingDataInfoEmployeeDraft || isRefetchingDataInfoEmployeeDraft}>
        {activeStep === EOnboardingStep.Personal && <PersonalEmployeeForm form={personalEmployeeForm} />}
        {activeStep === EOnboardingStep.Job && (
          <JobEmployeeForm
            form={jobEmployeeForm}
            employeeName={
              personalEmployeeForm.getValues(EPersonalEmployeeFormKey.FullName) ||
              dataInfoEmployeeDraft?.payload?.personal?.fullName
            }
          />
        )}
      </SkelethonLoading>

      {/* Action */}
      <ActionUpsertEmployee
        onCancel={handleCancel}
        activeStep={activeStep}
        onBack={handleBack}
        onContinue={handleContinue}
        // onCreate={handleCreate}
        disabledContinueAction={handleGetDisabledContinueAction()}
      />
    </>
  )
}

export default UpsertEmployee
