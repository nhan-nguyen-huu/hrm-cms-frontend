import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { Button } from '~/components/ui/button'
import { formatHelper } from '~/helpers'
import useQueryParams from '~/hooks/use-query-params'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EContractType, EOnboardingStep } from '~/shared/enums/common.enum'
import type { IEmployee } from '~/shared/models/employee.model'

interface IReviewBeforeCreatingProps {
  data?: IEmployee
  onChangeActiveStep: (step: EOnboardingStep) => void
}
const ReviewBeforeCreating = ({ data, onChangeActiveStep }: IReviewBeforeCreatingProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const { updateQueries } = useQueryParams()
  const dataPersonal = data?.payload?.personal
  const dataJob = data?.payload?.job
  const dataContract = data?.payload?.contract
  const _DATA = [
    {
      label: t('stepper.upsertEmployee.personalInfo.title'),
      step: EOnboardingStep.Personal,
      values: [
        {
          label: t('inputLabel.fullName'),
          value: dataPersonal?.fullName
        },
        {
          label: t('inputLabel.birthDate'),
          value: dataPersonal?.dateOfBirth
        },
        {
          label: t('inputLabel.cccdNumber'),
          value: dataPersonal?.idCardNumber
        },
        {
          label: t('inputLabel.phoneNumber'),
          value: dataPersonal?.phone
        }
      ]
    },
    {
      label: t('stepper.upsertEmployee.jobOrganization.title'),
      step: EOnboardingStep.Job,
      values: [
        {
          label: t('inputLabel.department'),
          value: dataJob?.departmentName
        },
        {
          label: t('inputLabel.jobTitle'),
          value: dataJob?.jobTitleName
        },
        {
          label: t('inputLabel.lineManager'),
          value: dataJob?.lineManagerName
        },
        {
          label: t('inputLabel.employmentStartDate'),
          value: dataJob?.startDate
        }
      ]
    },
    {
      label: t('stepper.upsertEmployee.contractSalary.title'),
      step: EOnboardingStep.Contract,
      values: [
        {
          label: t('inputLabel.contractType'),
          value: getTranslateEnum({
            enumType: EContractType,
            enumPath: 'contractType',
            value: dataContract?.contractType
          })
        },
        {
          label: t('inputLabel.effectiveDate'),
          value: `${dataContract?.effectiveDate} - ${dataContract?.expiryDate}`
        },
        {
          label: t('inputLabel.baseSalary'),
          value: formatHelper.formatCurrency(dataContract?.baseSalary, 'CURRENCY')
        },
        {
          label: t('inputLabel.probationSalary'),
          value: formatHelper.formatCurrency(dataContract?.probationSalary, 'CURRENCY')
        }
      ]
    }
  ]
  const handleChangeActiveStep = (step: EOnboardingStep) => {
    updateQueries({
      step: step,
      id: data?.id
    })
    onChangeActiveStep(step)
  }
  return (
    <CardCustom title={t('title.reviewBeforeCreating')}>
      <section className='grid grid-cols-12 gap-8'>
        {_DATA.map((item, index) => {
          return (
            <section key={index} className='col-span-4 flex flex-col gap-2'>
              <section className='flex items-center justify-between gap-2'>
                <span className='text-[#93A2B6] uppercase font-semibold text-xs'>{item?.label}</span>
                <Button
                  variant={'link'}
                  className='font-semibold p-0!'
                  onClick={() => handleChangeActiveStep(item?.step)}
                >
                  {t('action.edit')}
                </Button>
              </section>
              {item?.values?.map((content) => {
                return (
                  <section key={content?.label} className='flex items-center justify-between gap-2'>
                    <p className='text-[#6E7F96] text-xs'>{content?.label}</p>
                    <p className='font-medium text-xs'>{content?.value}</p>
                  </section>
                )
              })}
            </section>
          )
        })}
      </section>
    </CardCustom>
  )
}

export default ReviewBeforeCreating
