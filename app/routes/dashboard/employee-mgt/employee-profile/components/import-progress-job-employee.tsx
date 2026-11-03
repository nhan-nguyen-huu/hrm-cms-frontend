import type { FieldPath, UseFormReturn } from 'react-hook-form'
import { useFormState, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ImportInprogress from '~/components/common/import-inprogress'
import { commonHelper } from '~/helpers'
import type { TJobEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import { EJobEmployeeFormKey } from '~/shared/enums/form.enum'

interface IImportProgressrtProgressJobbogEmployeeProps {
  form: UseFormReturn<TJobEmployeeSchema>
}

const POSITION_FIELDS: FieldPath<TJobEmployeeSchema>[] = [
  EJobEmployeeFormKey.DepartmentId,
  EJobEmployeeFormKey.ProjectId,
  EJobEmployeeFormKey.JobTitleId,
  EJobEmployeeFormKey.JobGradeId,
  EJobEmployeeFormKey.LineManagerId
]

const TIME_AND_WORK_FIELDS: FieldPath<TJobEmployeeSchema>[] = [
  EJobEmployeeFormKey.StartDate,
  EJobEmployeeFormKey.EmploymentType,
  EJobEmployeeFormKey.OfficeId,
  EJobEmployeeFormKey.WorkShift
]

const POLICY_FIELDS: FieldPath<TJobEmployeeSchema>[] = [EJobEmployeeFormKey.AnnualLeaveDays]

const ImportProgressJobEmployee = ({ form }: IImportProgressrtProgressJobbogEmployeeProps) => {
  const { t } = useTranslation()
  const { control } = form
  const { errors } = useFormState({ control })
  const values = useWatch({ control })

  const positionCompletedCount = commonHelper.countCompletedFields(POSITION_FIELDS, values, errors)
  const timeAndWorkCompletedCount = commonHelper.countCompletedFields(TIME_AND_WORK_FIELDS, values, errors)
  const policyCompletedCount = commonHelper.countCompletedFields(POLICY_FIELDS, values, errors)

  const progressItems = [
    {
      label: t('title.jobPosition'),
      isDone: positionCompletedCount === POSITION_FIELDS.length,
      display: `${positionCompletedCount}/${POSITION_FIELDS.length}`
    },
    {
      label: t('title.timeAndWorkplace'),
      isDone: timeAndWorkCompletedCount === TIME_AND_WORK_FIELDS.length,
      display: `${timeAndWorkCompletedCount}/${TIME_AND_WORK_FIELDS.length}`
    },
    {
      label: t('title.appliedPolicies'),
      isDone: policyCompletedCount === POLICY_FIELDS.length,
      display: `${policyCompletedCount}/${POLICY_FIELDS.length}`
    }
  ]

  return <ImportInprogress progressItems={progressItems} />
}

export default ImportProgressJobEmployee
