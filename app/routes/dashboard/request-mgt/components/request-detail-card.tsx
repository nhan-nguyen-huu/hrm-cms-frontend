import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Check, Paperclip, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Stepper from '~/components/common/stepper'
import FormField from '~/components/forms/form-field'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Textarea } from '~/components/ui/textarea'
import { DATE_TIME_FORMAT_SLASH, commonHelper, dateHelper, fortmatHelper } from '~/helpers'
import { type TReviewRequestSchema, getReviewRequestSchema } from '~/helpers/schemas/request-schema.helper'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { DATA } from '~/shared/constants/data.constant'
import { EDepartment, ERequestStatus, ERequestType } from '~/shared/enums/common.enum'
import { EReviewRequestFormKey } from '~/shared/enums/form.enum'
import type { IRequest } from '~/shared/models/request.model'

interface IRequestDetailCardProps {
  // Re-mount per request (key={request.id}) so the note field starts empty
  request?: IRequest
  onApprove: (note: string) => void
  onReject: (note: string) => void
}

// Stepper index of the approval progress (line manager → HR → timesheet update)
const ACTIVE_STEP: Record<ERequestStatus, number> = {
  [ERequestStatus.PendingManager]: 0,
  [ERequestStatus.PendingHr]: 1,
  [ERequestStatus.Approved]: 3,
  [ERequestStatus.Rejected]: 1
}

const SectionTitle = ({ children }: { children: string }) => (
  <p className='text-[11.5px] font-semibold uppercase tracking-wide text-[#6E7F96]'>{children}</p>
)

// Detail panel of the request screen: employee · dates · reason · attachment · approval progress · approve/reject
const RequestDetailCard = ({ request, onApprove, onReject }: IRequestDetailCardProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const form = useForm<TReviewRequestSchema>({
    resolver: zodResolver(getReviewRequestSchema()),
    defaultValues: { [EReviewRequestFormKey.Note]: '' },
    mode: 'all'
  })

  const employee = request?.employee
  const isPending = request?.status === ERequestStatus.PendingManager || request?.status === ERequestStatus.PendingHr
  const isExplanation = request?.type === ERequestType.AttendanceExplanation
  // Rejected before reaching HR (no HR review) = rejected by the line manager → stops at the first step
  const isRejectedByManager = request?.status === ERequestStatus.Rejected && !request.hrReviewedAt
  const activeStep = isRejectedByManager || !request?.status ? 0 : ACTIVE_STEP[request.status]
  const department =
    employee?.department &&
    t('common.orgPositionDepartment', {
      departmentName: getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: employee.department })
    })
  const subtitle = [employee?.code, employee?.jobTitle, department].filter(Boolean).join(' · ')
  const rows = DATA.GET_REQUEST_DETAIL_ROWS(t, request)

  const submit = (action: (note: string) => void) =>
    form.handleSubmit((values) => action(values[EReviewRequestFormKey.Note]))

  return (
    <Card className='gap-5 px-5'>
      <section className='flex flex-wrap items-center gap-3.5'>
        <Avatar className='size-12 rounded-[14px]'>
          <AvatarImage src={employee?.avatarUrl} />
          <AvatarFallback className={clsx('rounded-[14px] font-semibold', commonHelper.getAvatarColor(employee?.name))}>
            {commonHelper.getInitials(employee?.name)}
          </AvatarFallback>
        </Avatar>
        <section className='flex min-w-0 flex-1 basis-48 flex-col'>
          <p className='text-[18px] font-bold text-app-secondary'>{employee?.name || '-'}</p>
          <p className='text-[12.5px] text-[#6E7F96]'>{subtitle || '-'}</p>
        </section>
        {request?.type && (
          <span className='rounded-md bg-[#EAF1FA] px-2 py-1 text-xs font-semibold text-primary'>
            {getTranslateEnum({ enumPath: 'requestTypeTitle', enumType: ERequestType, value: request.type })}
          </span>
        )}
      </section>

      <section className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
        {rows.map((row) => (
          <section key={row.label} className='flex flex-col gap-1 rounded-xl bg-[#F7F9FC] px-3.5 py-3'>
            <p className='text-[12px] text-[#6E7F96]'>{row.label}</p>
            <p className='text-[15px] font-bold text-app-secondary'>{row.value}</p>
          </section>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <SectionTitle>{t(isExplanation ? 'inputLabel.explanationContent' : 'inputLabel.leaveReason')}</SectionTitle>
        <p className='rounded-xl bg-[#F7F9FC] px-4 py-3 text-[13px] leading-relaxed'>{request?.reason || '-'}</p>
        {request?.attachment?.name && (
          <a
            href={request.attachment.url}
            target='_blank'
            rel='noopener noreferrer'
            className={clsx(
              'flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium',
              request.attachment.url ? 'hover:bg-[#F7F9FC]' : 'pointer-events-none'
            )}
          >
            <Paperclip className='size-4 text-[#6E7F96]' />
            <span>{request.attachment.name}</span>
            <span className='text-[#93A2B6]'>· {fortmatHelper.formatFileSize(request.attachment.size)}</span>
          </a>
        )}
      </section>

      <section className='flex flex-col gap-3'>
        <SectionTitle>{t('title.approvalProgress')}</SectionTitle>
        <Stepper steps={DATA.GET_REQUEST_APPROVAL_STEPS(t, request)} activeStep={activeStep} />
      </section>

      {isPending && (
        <form className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name={EReviewRequestFormKey.Note}
            render={(field) => (
              <Textarea {...field} id={field.name} placeholder={t('inputPlaceholder.noteForEmployee')} />
            )}
          />
          <section className='flex flex-wrap items-center gap-3'>
            <Button
              type='button'
              variant='outline'
              className='border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700'
              onClick={submit(onReject)}
            >
              <X className='size-4' />
              <span>{t('action.reject')}</span>
            </Button>
            <Button type='button' onClick={submit(onApprove)}>
              <Check className='size-4' />
              <span>{t('action.approveRequest')}</span>
            </Button>
            <p className='ml-auto text-[12.5px] text-[#6E7F96]'>
              {t('common.submittedAt', {
                time: dateHelper.formatDate(request?.submittedAt, DATE_TIME_FORMAT_SLASH, '-')
              })}
            </p>
          </section>
        </form>
      )}
      {!isPending && (
        <p className='text-right text-[12.5px] text-[#6E7F96]'>
          {t('common.submittedAt', { time: dateHelper.formatDate(request?.submittedAt, DATE_TIME_FORMAT_SLASH, '-') })}
        </p>
      )}
    </Card>
  )
}

export default RequestDetailCard
