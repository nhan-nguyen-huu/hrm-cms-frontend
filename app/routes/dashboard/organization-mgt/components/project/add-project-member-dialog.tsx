import { useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import { DATE_FORMAT, dateHelper } from '~/helpers/date.helper'
import { formHelper } from '~/helpers/form.helper'
import {
  MAX_TOTAL_ALLOCATION,
  type TAddProjectMemberSchema,
  getAddProjectMemberSchema
} from '~/helpers/schemas/project-schema.helper'
import { useGetListEmployeeApi } from '~/hooks/apis/use-employee-api'
import { useGetAllocationPreviewApi } from '~/hooks/apis/use-project-api'
import useMutationApi from '~/hooks/use-mutation-api'
import AddProjectMemberForm from '~/routes/dashboard/organization-mgt/components/project/add-project-member-form'
import { ProjectService } from '~/services/project.service'
import { DATA } from '~/shared/constants/data.constant'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'
import { EAddProjectMemberFormKey } from '~/shared/enums/form.enum'
import type { IProjectDetail } from '~/shared/models/project.model'

const FORM_ID = 'add-project-member-form'

// Employees offered in the select — TODO: one page only; switch to a searchable select (keyword param) as it grows
const CANDIDATE_PARAMS = { page: 0, size: 100 }

interface IAddProjectMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: IProjectDetail
}

// "Thêm thành viên vào dự án" modal (design screen CmsDuAnThemThanhVien)
const AddProjectMemberDialog = ({ open, onOpenChange, project }: IAddProjectMemberDialogProps) => {
  // Lib
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  // Form
  const form = useForm<TAddProjectMemberSchema>({
    resolver: zodResolver(getAddProjectMemberSchema(t)),
    defaultValues: formHelper.getDefaultValuesAddProjectMember(),
    mode: 'all'
  })
  const [employeeId, allocation] = useWatch({
    control: form.control,
    name: [EAddProjectMemberFormKey.Employee, EAddProjectMemberFormKey.Allocation]
  })
  const userId = Number(employeeId) || undefined
  const allocationValue = Number(allocation) || 0

  // Query — employees not yet on the project
  const { dataList: employees } = useGetListEmployeeApi({ params: CANDIDATE_PARAMS, options: { enabled: open } })
  const candidates = useMemo(
    () => employees.filter((employee) => !project?.members?.some((member) => member.userId === employee.id)),
    [employees, project?.members]
  )
  const candidateOptions = useMemo(() => DATA.GET_OPTIONS_PROJECT_MEMBER_CANDIDATE(candidates), [candidates])

  // The selected employee's other projects. Share 0 so one call per employee is enough: the lines never include
  // the project being proposed, and the total over 100% is computed here as the share is typed
  const { data: preview, isFetching: isPreviewLoading } = useGetAllocationPreviewApi({
    id: project?.id,
    params: { userId, allocationPercent: 0 },
    options: { enabled: open && !!project?.id && !!userId }
  })
  const otherAllocation = userId
    ? (preview?.lines ?? []).reduce((sum, line) => sum + (Number(line.allocationPercent) || 0), 0)
    : 0
  const isOverAllocated = !!userId && !!preview && otherAllocation + allocationValue > MAX_TOTAL_ALLOCATION

  // Hand the other projects' share to the schema (hidden field), so the "confirm over 100%" rule uses real numbers
  useEffect(() => {
    form.setValue(EAddProjectMemberFormKey.OtherAllocation, otherAllocation, { shouldValidate: true })
  }, [form, otherAllocation])

  // fix not reset isOverAllocated when change member
  useEffect(() => {
    form.setValue(EAddProjectMemberFormKey.ConfirmOverAllocation, false, { shouldValidate: form.formState.isSubmitted })
  }, [form, employeeId, isOverAllocated])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) form.reset(formHelper.getDefaultValuesAddProjectMember())
    onOpenChange(nextOpen)
  }

  // API — BE refuses a share past 100% (PRJ_007) unless overAllocationAcknowledged is sent
  const { mutate: addMember, isPending } = useMutationApi({
    mutationFn: ProjectService.AddProjectMember,
    onSuccess: (_, variables) => {
      const name = candidates.find((candidate) => candidate.id === variables.userId)?.fullName
      toast.success(t('msg.addMemberSuccess', { name }))
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_LIST] })
      handleOpenChange(false)
    }
  })

  const handleSubmit = (values: TAddProjectMemberSchema) => {
    if (!project?.id) return
    addMember({
      projectId: project.id,
      userId: Number(values[EAddProjectMemberFormKey.Employee]),
      projectRole: values[EAddProjectMemberFormKey.Role],
      allocationPercent: Number(values[EAddProjectMemberFormKey.Allocation]),
      joinedFrom: dateHelper.formatDate(values[EAddProjectMemberFormKey.JoinedDate], DATE_FORMAT),
      overAllocationAcknowledged: isOverAllocated && values[EAddProjectMemberFormKey.ConfirmOverAllocation]
      // TODO: the design has no reason field yet; BE records `overAllocationReason` as an org event when sent
    })
  }

  return (
    <DialogCustom
      open={open}
      onOpenChange={handleOpenChange}
      classNameContent='sm:max-w-155'
      title={t('title.addProjectMember')}
      description={[
        project?.projectName,
        project?.projectCode,
        project?.departmentName && t('common.orgPositionDepartment', { departmentName: project.departmentName })
      ]
        .filter(Boolean)
        .join(' · ')}
      footerDescription={t('msg.newMemberNotified')}
      cancelText={t('action.cancel')}
      okText={t('action.addToProject')}
      isDisabledOkBtn={!form.formState.isValid || isPreviewLoading || isPending}
      onOkAction={form.handleSubmit(handleSubmit)}
    >
      <AddProjectMemberForm
        form={form}
        formId={FORM_ID}
        candidateOptions={candidateOptions}
        checkRows={
          userId && preview ? DATA.GET_ALLOCATION_CHECK_ROWS(t, project, preview.lines, allocationValue) : undefined
        }
        isOverAllocated={isOverAllocated}
        onSubmit={handleSubmit}
      />
    </DialogCustom>
  )
}

export default AddProjectMemberDialog
