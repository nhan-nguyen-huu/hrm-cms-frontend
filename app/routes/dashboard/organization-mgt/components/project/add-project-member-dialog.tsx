import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DialogCustom from '~/components/customs/dialog-custom'
import { DATE_FORMAT_MONTH_YEAR, dateHelper } from '~/helpers/date.helper'
import { formHelper } from '~/helpers/form.helper'
import {
  MAX_TOTAL_ALLOCATION,
  type TAddProjectMemberSchema,
  getAddProjectMemberSchema
} from '~/helpers/schemas/project-schema.helper'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import AddProjectMemberForm from '~/routes/dashboard/organization-mgt/components/project/add-project-member-form'
import { DATA } from '~/shared/constants/data.constant'
import { EDepartment } from '~/shared/enums/common.enum'
import { EAddProjectMemberFormKey } from '~/shared/enums/form.enum'
import type { IProjectDetail, IProjectMember, IProjectMemberCandidate } from '~/shared/models/project.model'

const FORM_ID = 'add-project-member-form'

interface IAddProjectMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: IProjectDetail
  // Employees not yet in the project
  candidates: IProjectMemberCandidate[]
  onSubmit: (member: IProjectMember) => void
}

// "Thêm thành viên vào dự án" modal (design screen CmsDuAnThemThanhVien)
const AddProjectMemberDialog = ({
  open,
  onOpenChange,
  project,
  candidates,
  onSubmit
}: IAddProjectMemberDialogProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()

  const getCandidate = (id?: string) => candidates.find((candidate) => candidate.id === id)
  const getOtherAllocation = (id?: string) =>
    (getCandidate(id)?.allocations ?? []).reduce((sum, item) => sum + (item.allocation ?? 0), 0)

  const form = useForm<TAddProjectMemberSchema>({
    resolver: zodResolver(getAddProjectMemberSchema(t, getOtherAllocation)),
    defaultValues: formHelper.getDefaultValuesAddProjectMember(),
    mode: 'all'
  })
  const [employeeId, allocation] = useWatch({
    control: form.control,
    name: [EAddProjectMemberFormKey.Employee, EAddProjectMemberFormKey.Allocation]
  })
  const candidate = getCandidate(employeeId)
  const allocationValue = Number(allocation) || 0
  const isOverAllocated = !!candidate && getOtherAllocation(employeeId) + allocationValue > MAX_TOTAL_ALLOCATION

  const candidateOptions = useMemo(
    () => DATA.GET_OPTIONS_PROJECT_MEMBER_CANDIDATE(candidates, getTranslateEnum),
    [candidates, getTranslateEnum]
  )
  const departmentName =
    project?.department &&
    getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: project.department })

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) form.reset(formHelper.getDefaultValuesAddProjectMember())
    onOpenChange(nextOpen)
  }

  const handleSubmit = (values: TAddProjectMemberSchema) => {
    const selected = getCandidate(values[EAddProjectMemberFormKey.Employee])
    const nextAllocation = Number(values[EAddProjectMemberFormKey.Allocation])
    // TODO: call the "add project member" API once available; the over-100% reason log is part of that request
    onSubmit({
      id: selected?.id,
      code: selected?.code,
      name: selected?.name,
      email: selected?.email,
      jobTitle: selected?.jobTitle,
      role: values[EAddProjectMemberFormKey.Role],
      allocation: nextAllocation,
      totalAllocation: getOtherAllocation(selected?.id) + nextAllocation,
      joinedMonth: dateHelper.formatDate(values[EAddProjectMemberFormKey.JoinedDate], DATE_FORMAT_MONTH_YEAR)
    })
    handleOpenChange(false)
  }

  return (
    <DialogCustom
      open={open}
      onOpenChange={handleOpenChange}
      classNameContent='sm:max-w-155'
      title={t('title.addProjectMember')}
      description={[
        project?.name,
        project?.code,
        departmentName && t('common.orgPositionDepartment', { departmentName })
      ]
        .filter(Boolean)
        .join(' · ')}
      footerDescription={t('msg.newMemberNotified')}
      cancelText={t('action.cancel')}
      okText={t('action.addToProject')}
      isDisabledOkBtn={!form.formState.isValid}
      onOkAction={form.handleSubmit(handleSubmit)}
    >
      <AddProjectMemberForm
        form={form}
        formId={FORM_ID}
        candidateOptions={candidateOptions}
        checkRows={candidate ? DATA.GET_ALLOCATION_CHECK_ROWS(t, project, candidate, allocationValue) : undefined}
        isOverAllocated={isOverAllocated}
        onSubmit={handleSubmit}
      />
    </DialogCustom>
  )
}

export default AddProjectMemberDialog
