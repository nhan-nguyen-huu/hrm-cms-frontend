import dayjs from 'dayjs'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { InfoCircleIcon } from '~/assets/svgs'
import OrgPosition from '~/components/common/org-position'
import CardCustom from '~/components/customs/card-custom'
import FormDateTimePickerField from '~/components/forms/form-date-time-picker-field'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { DATE_FORMAT_SLASH, commonHelper, dateHelper, formatHelper } from '~/helpers'
import type { TJobEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import {
  useGetListDepartmentApi,
  useGetListJobGradeApi,
  useGetListJobTitleApi,
  useGetListManagerApi,
  useGetListOfficeApi,
  useGetListProjectApi
} from '~/hooks/apis/use-employee-api'
import ImportProgressJobEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/import-progress-job-employee'
import { DATA } from '~/shared/constants/data.constant'
import { EJobEmployeeFormKey } from '~/shared/enums/form.enum'

interface IJobEmployeeFormProps {
  form: UseFormReturn<TJobEmployeeSchema>
  employeeName?: string
}

const JobEmployeeForm = ({ form, employeeName }: IJobEmployeeFormProps) => {
  const { t } = useTranslation()
  const startDate = form.watch(EJobEmployeeFormKey.StartDate)
  const isStartDateInFuture = Boolean(startDate && dayjs(startDate).startOf('day').isAfter(dayjs().startOf('day')))
  const departmentId = form.watch(EJobEmployeeFormKey.DepartmentId)
  const projectId = form.watch(EJobEmployeeFormKey.ProjectId)
  const lineManagerId = form.watch(EJobEmployeeFormKey.LineManagerId)

  const departmentSelected = Boolean(departmentId)

  // Data departments
  const { data: departments } = useGetListDepartmentApi()

  // Params
  const departmentParams = { departmentId: Number(departmentId) }

  // Options
  const dependentListOptions = {
    params: departmentParams,
    options: { enabled: departmentSelected }
  }

  // Data dependency
  const { data: projects } = useGetListProjectApi(dependentListOptions)
  const { data: jobTitles } = useGetListJobTitleApi(dependentListOptions)
  const { data: jobGrades } = useGetListJobGradeApi(dependentListOptions)
  const { data: managers } = useGetListManagerApi(dependentListOptions)
  const { data: offices } = useGetListOfficeApi()

  // Convert data
  const departmentOptions = commonHelper.convertToOptions(departments, 'name', 'id')
  const projectOptions = commonHelper.convertToOptions(projects, 'name', 'id')
  const jobTitleOptions = commonHelper.convertToOptions(jobTitles, 'name', 'id')
  const jobGradeOptions = commonHelper.convertToOptions(jobGrades, 'name', 'id')
  const managerOptions = commonHelper.convertToOptions(managers, 'name', 'id')
  const officeOptions = commonHelper.convertToOptions(offices, 'name', 'id')
  const employmentTypeOptions = DATA.GET_OPTIONS_EMPLOYMENT_TYPE(t)
  const workShiftOptions = DATA.GET_OPTIONS_WORK_SHIFT(t)

  const departmentName = departmentOptions?.find((item) => item?.value === departmentId)?.label
  const projectName = projectOptions?.find((item) => item?.value === projectId)?.label
  const managerName = managerOptions?.find((item) => item?.value === lineManagerId)?.label

  // Clear
  const handleDepartmentChange = () => {
    form.setValue(EJobEmployeeFormKey.ProjectId, '')
    form.setValue(EJobEmployeeFormKey.JobTitleId, '')
    form.setValue(EJobEmployeeFormKey.JobGradeId, '')
    form.setValue(EJobEmployeeFormKey.LineManagerId, '')
    form.clearErrors([
      EJobEmployeeFormKey.ProjectId,
      EJobEmployeeFormKey.JobTitleId,
      EJobEmployeeFormKey.JobGradeId,
      EJobEmployeeFormKey.LineManagerId
    ])
  }

  return (
    <form className='grid grid-cols-12 gap-4'>
      <section className='flex flex-col gap-4 col-span-12 sm:col-span-8 md:col-span-9'>
        <CardCustom title={t('title.jobPosition')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12 md:col-span-4'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.DepartmentId}
                label={t('inputLabel.department')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={departmentOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={departmentOptions?.length === 0}
                    onCloseValidate={() => form.trigger(EJobEmployeeFormKey.DepartmentId)}
                    onValueChangeValidate={handleDepartmentChange}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-4'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.ProjectId}
                label={t('inputLabel.participatingProject')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={projectOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={!departmentSelected || projectOptions?.length === 0}
                    onCloseValidate={() => form.trigger(EJobEmployeeFormKey.ProjectId)}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-4'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.JobTitleId}
                label={t('inputLabel.jobTitle')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={jobTitleOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={!departmentSelected || jobTitleOptions?.length === 0}
                    onCloseValidate={() => form.trigger(EJobEmployeeFormKey.JobTitleId)}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-4'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.JobGradeId}
                label={t('inputLabel.jobGrade')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={jobGradeOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={!departmentSelected || jobGradeOptions?.length === 0}
                    onCloseValidate={() => form.trigger(EJobEmployeeFormKey.JobGradeId)}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-4'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.LineManagerId}
                label={t('inputLabel.lineManager')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={managerOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={!departmentSelected || managerOptions?.length === 0}
                    onCloseValidate={() => form.trigger(EJobEmployeeFormKey.LineManagerId)}
                  />
                )}
              />
            </Field>
          </section>
        </CardCustom>
        <CardCustom title={t('title.timeAndWorkplace')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.StartDate}
                label={t('inputLabel.startDate')}
                isRequired
                render={(field, fieldState) => (
                  <FormDateTimePickerField
                    field={field}
                    fieldState={fieldState}
                    placeHolder={t('inputPlaceholder.pleaseSelectDate')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.EmploymentType}
                label={t('inputLabel.employmentType')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={employmentTypeOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={employmentTypeOptions?.length === 0}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.OfficeId}
                label={t('inputLabel.workLocation')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={officeOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={officeOptions?.length === 0}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.WorkShift}
                label={t('inputLabel.workShift')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={workShiftOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={workShiftOptions?.length === 0}
                  />
                )}
              />
            </Field>
          </section>
        </CardCustom>
        <CardCustom title={t('title.appliedPolicies')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12 md:col-span-4'>
              <FormField
                control={form.control}
                name={EJobEmployeeFormKey.AnnualLeaveDays}
                label={t('inputLabel.annualLeaveFund')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    onChange={(e) => {
                      field.onChange(formatHelper.formatNumber(e.target.value))
                    }}
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  />
                )}
              />
            </Field>
          </section>
        </CardCustom>
      </section>
      <section className='flex flex-col gap-4 col-span-12 sm:col-span-4 md:col-span-3'>
        <OrgPosition
          departmentName={departmentName}
          projectName={projectName}
          memberCount={projectOptions?.length}
          managerName={managerName}
          employeeName={employeeName}
        />
        <ImportProgressJobEmployee form={form} />
        {isStartDateInFuture && (
          <CardCustom title={t('title.note')}>
            <section className='flex items-start gap-3 justify-start'>
              <InfoCircleIcon className='size-5 shrink-0 text-app-primay' />
              <p className='text-app-primay'>
                {t('msg.futureStartDateNote', {
                  date: dateHelper.formatDate(startDate, DATE_FORMAT_SLASH)
                })}
              </p>
            </section>
          </CardCustom>
        )}
      </section>
    </form>
  )
}

export default JobEmployeeForm
