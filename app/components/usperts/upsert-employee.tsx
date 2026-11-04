import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import AccountEmployeeForm from '~/components/forms/employee/account-employee-form'
import ContractEmployeeForm from '~/components/forms/employee/contract-employee-form'
import JobEmployeeForm from '~/components/forms/employee/job-employee-form'
import PersonalEmployeeForm from '~/components/forms/employee/personal-employee-form'
import SkelethonLoading from '~/components/loading/skelethon-loading'
import { DATE_FORMAT, commonHelper, formatHelper } from '~/helpers'
import { formHelper } from '~/helpers/form.helper'
import {
  type TAccountEmployeeSchema,
  type TContractEmployeeSchema,
  type TJobEmployeeSchema,
  type TPersonalEmployeeSchema,
  getAccountEmployeeSchema,
  getContractEmployeeSchema,
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
import {
  EAccountEmployeeFormKey,
  EContractEmployeeFormKey,
  EJobEmployeeFormKey,
  EPersonalEmployeeFormKey
} from '~/shared/enums/form.enum'
import type { eScreenMode } from '~/shared/models/common.model'
import type { IAccount, IContract, IJob, IPersonal } from '~/shared/models/employee.model'

interface IUpsertEmployeeProps {
  screenMode: eScreenMode
}

type TSaveStepVariables =
  | { step: EOnboardingStep.Personal; payload: IPersonal }
  | { step: EOnboardingStep.Job; payload: IJob }
  | { step: EOnboardingStep.Contract; payload: IContract }
  | { step: EOnboardingStep.Account; payload: IAccount }

const UpsertEmployee = ({ screenMode }: IUpsertEmployeeProps) => {
  console.log(screenMode)
  const { t } = useTranslation()
  const { searchParams, updateQueries } = useQueryParams()
  const idFromUrl = searchParams.get('id') ?? ''
  const [id, setId] = useState<number | undefined>(idFromUrl ? Number(idFromUrl) : undefined)
  const activeStepParam = (searchParams.get('step') as EOnboardingStep) ?? EOnboardingStep.Personal
  const [activeStep, setActiveStep] = useState<EOnboardingStep>(activeStepParam)
  const { activeStepKey } = commonHelper.getOnboardingStep(activeStep)
  const navi = useNavigate()

  // Api infor employee draft
  const {
    data: dataInfoEmployeeDraft,
    isLoading: isLoadingDataInfoEmployeeDraft,
    isRefetching: isRefetchingDataInfoEmployeeDraft,
    refetch: refetchDataInfoEmployeeDraft
  } = useGetInfoEmployeeDraftApi({
    id: id,
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

  // Contract employee form
  const contractEmployeeSchema = getContractEmployeeSchema(t)
  const contractEmployeeForm = useForm<TContractEmployeeSchema>({
    resolver: zodResolver(contractEmployeeSchema),
    defaultValues: formHelper.getDefaultValuesContractEmployee(),
    mode: 'all'
  })

  // Account employee form
  const accountEmployeeSchema = getAccountEmployeeSchema(t)
  const accountEmployeeForm = useForm<TAccountEmployeeSchema>({
    resolver: zodResolver(accountEmployeeSchema),
    defaultValues: formHelper.getDefaultValuesAccountEmployee(),
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
  const createEmployeeMutation = useMutationApi({
    mutationFn: EmployeeService.CreateEmployee,
    onSuccess: (res) => {
      const isSuccess = res?.result
      if (isSuccess) {
        toast.success(t('msg.createEmployeeSuccess'))
        handleCancel()
      }
    }
  })
  const saveStepMutation = useMutationApi({
    mutationFn: (variables: TSaveStepVariables) => {
      switch (variables.step) {
        case EOnboardingStep.Personal:
          return EmployeeService.SavePersonalStep(variables.payload)
        case EOnboardingStep.Job:
          return EmployeeService.SaveJobStep(variables.payload)
        case EOnboardingStep.Contract:
          return EmployeeService.SaveContractStep(variables.payload)
        case EOnboardingStep.Account:
          return EmployeeService.SaveAccountStep(variables.payload)
      }
    },
    onSuccess: (res, variables) => {
      const isSuccess = res?.result
      if (isSuccess) {
        if (variables.step === EOnboardingStep.Account) {
          createEmployeeMutation.mutate({
            id: res?.data?.id
          })
          return
        }
        if (variables.step === EOnboardingStep.Personal) {
          setId(res?.data?.id)
        } else {
          refetchDataInfoEmployeeDraft()
        }
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

  const handleSaveContract = () => {
    const formValues = contractEmployeeForm.getValues()
    const payload: IContract = {
      ...formValues,
      id: id ? Number(id) : undefined,
      signedDate: formValues.signedDate ? dayjs(formValues.signedDate).startOf('day').format(DATE_FORMAT) : undefined,
      effectiveDate: formValues.effectiveDate ? dayjs(formValues.effectiveDate).startOf('day').format(DATE_FORMAT) : '',
      expiryDate: formValues.expiryDate ? dayjs(formValues.expiryDate).startOf('day').format(DATE_FORMAT) : undefined,
      probationSalaryRate: Number(formValues.probationSalaryRate),
      baseSalary: formValues.baseSalary ? Number(formatHelper.formatPrice(formValues.baseSalary)?.raw) : undefined,
      probationSalary: formValues.probationSalary
        ? Number(formatHelper.formatPrice(formValues.probationSalary)?.raw)
        : undefined,
      insuranceSalary: formValues.insuranceSalary
        ? Number(formatHelper.formatPrice(formValues.insuranceSalary)?.raw)
        : undefined,
      allowances: formValues.allowances?.map((allowance) => ({
        allowanceName: allowance.allowanceName?.trim(),
        amount: Number(formatHelper.formatPrice(allowance.amount).raw)
      }))
    }
    saveStepMutation.mutate({ step: EOnboardingStep.Contract, payload })
  }

  const handleSaveAccount = () => {
    const formValues = accountEmployeeForm.getValues()
    const payload: IAccount = {
      ...formValues,
      id: id ? Number(id) : undefined,
      email: formValues.email.trim()
    }
    saveStepMutation.mutate({ step: EOnboardingStep.Account, payload })
  }

  const handleContinue = () => {
    switch (activeStep) {
      case EOnboardingStep.Personal:
        handleSavePersonal()
        break
      case EOnboardingStep.Job:
        handleSaveJob()
        break
      case EOnboardingStep.Contract:
        handleSaveContract()
        break
    }
  }

  const handleGetDisabledContinueAction = () => {
    switch (activeStep) {
      case EOnboardingStep.Personal:
        return !personalEmployeeForm.formState.isValid
      case EOnboardingStep.Job:
        return !jobEmployeeForm.formState.isValid
      case EOnboardingStep.Contract:
        return !contractEmployeeForm.formState.isValid
      case EOnboardingStep.Account:
        return !accountEmployeeForm.formState.isValid
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

  const handleParseContractForm = () => {
    if (!id || !dataInfoEmployeeDraft?.payload?.contract) return
    const contract = dataInfoEmployeeDraft.payload.contract
    contractEmployeeForm.reset({
      [EContractEmployeeFormKey.ContractType]: contract.contractType,
      [EContractEmployeeFormKey.ContractNumber]: contract.contractNumber ?? '',
      [EContractEmployeeFormKey.SignedDate]: contract.signedDate ? new Date(contract.signedDate) : undefined,
      [EContractEmployeeFormKey.EffectiveDate]: contract.effectiveDate ? new Date(contract.effectiveDate) : undefined,
      [EContractEmployeeFormKey.ExpiryDate]: contract.expiryDate ? new Date(contract.expiryDate) : undefined,
      [EContractEmployeeFormKey.ProbationSalaryRate]: String(contract.probationSalaryRate ?? ''),

      [EContractEmployeeFormKey.BaseSalary]: contract.baseSalary
        ? formatHelper.formatPrice(contract?.baseSalary?.toString())?.formatted
        : '',
      [EContractEmployeeFormKey.ProbationSalary]: contract.probationSalary
        ? formatHelper.formatPrice(contract?.probationSalary?.toString())?.formatted
        : '',
      [EContractEmployeeFormKey.InsuranceSalary]: contract.insuranceSalary
        ? formatHelper.formatPrice(contract?.insuranceSalary?.toString())?.formatted
        : '',
      [EContractEmployeeFormKey.Allowances]:
        contract.allowances?.map((allowance) => ({
          [EContractEmployeeFormKey.AllowanceName]: allowance.allowanceName ?? '',
          [EContractEmployeeFormKey.Amount]:
            allowance?.amount !== undefined && allowance.amount !== null
              ? formatHelper.formatPrice(String(allowance.amount)).formatted
              : ''
        })) ?? [],

      [EContractEmployeeFormKey.TaxCode]: contract.taxCode ?? '',
      [EContractEmployeeFormKey.SocialInsuranceNumber]: contract.socialInsuranceNumber ?? '',
      [EContractEmployeeFormKey.BankName]: contract.bankName ?? '',
      [EContractEmployeeFormKey.BankAccountNumber]: contract.bankAccountNumber ?? ''
    })
  }

  const handleParseAccountForm = () => {
    if (!id || !dataInfoEmployeeDraft?.payload?.account) return
    const account = dataInfoEmployeeDraft.payload.account
    accountEmployeeForm.reset({
      [EAccountEmployeeFormKey.Email]: account.email ?? '',
      [EAccountEmployeeFormKey.SendInviteEmail]: account.sendInviteEmail ?? true,
      [EAccountEmployeeFormKey.RequirePasswordChange]: account.requirePasswordChange ?? true
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
      case EOnboardingStep.Contract:
        handleParseContractForm()
        break
      case EOnboardingStep.Account:
        handleParseAccountForm()
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
        {activeStep === EOnboardingStep.Contract && <ContractEmployeeForm form={contractEmployeeForm} />}
        {activeStep === EOnboardingStep.Account && (
          <AccountEmployeeForm
            form={accountEmployeeForm}
            data={dataInfoEmployeeDraft}
            fullName={
              personalEmployeeForm.getValues(EPersonalEmployeeFormKey.FullName) ||
              dataInfoEmployeeDraft?.payload?.personal?.fullName
            }
            personalEmail={
              personalEmployeeForm.getValues(EPersonalEmployeeFormKey.PersonalEmail) ||
              dataInfoEmployeeDraft?.payload?.personal?.personalEmail
            }
            effectiveDate={
              contractEmployeeForm.getValues(EContractEmployeeFormKey.EffectiveDate)
                ? dayjs(contractEmployeeForm.getValues(EContractEmployeeFormKey.EffectiveDate))
                    .startOf('day')
                    .format(DATE_FORMAT)
                : dataInfoEmployeeDraft?.payload?.contract?.effectiveDate
            }
            onChangeActiveStep={setActiveStep}
          />
        )}
      </SkelethonLoading>

      {/* Action */}
      <ActionUpsertEmployee
        onCancel={handleCancel}
        activeStep={activeStep}
        onBack={handleBack}
        onContinue={handleContinue}
        onCreate={handleSaveAccount}
        disabledContinueAction={handleGetDisabledContinueAction()}
      />
    </>
  )
}

export default UpsertEmployee
