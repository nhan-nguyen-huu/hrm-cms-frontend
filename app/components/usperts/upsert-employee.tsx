import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import PersonalEmployeeForm from '~/components/forms/employee/personal-employee-form'
import { commonHelper } from '~/helpers'
import { formHelper } from '~/helpers/form.helper'
import { type TPersonalEmployeeSchema, getPersonalEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import useQueryParams from '~/hooks/use-query-params'
import ActionUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/action-upsert-employee'
import HeaderUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/header-upsert-employee'
import { EOnboardingStep } from '~/shared/enums/common.enum'
import type { eScreenMode } from '~/shared/models/common.model'

interface IUpsertEmployeeProps {
  screenMode: eScreenMode
}
const UpsertEmployee = ({ screenMode }: IUpsertEmployeeProps) => {
  console.log(screenMode)
  const { t } = useTranslation()
  const { searchParams, setQuery } = useQueryParams()
  const activeStepParam = (searchParams.get('step') as EOnboardingStep) ?? EOnboardingStep.Personal
  const [activeStep, setActiveStep] = useState<EOnboardingStep>(activeStepParam)
  const { activeStepKey } = commonHelper.getOnboardingStep(activeStep)
  const navi = useNavigate()
  // Personal employee form
  const personalEmployeeSchema = getPersonalEmployeeSchema(t)
  const personalEmployeeForm = useForm<TPersonalEmployeeSchema>({
    resolver: zodResolver(personalEmployeeSchema),
    defaultValues: formHelper.getDefaultValuesLoginPersonalEmployee(),
    mode: 'all'
  })

  // Action
  const handleCancel = () => {
    navi(-1)
  }

  const handleBack = () => {
    const { prevStepKey } = commonHelper.getOnboardingStep(activeStep)
    setActiveStep(prevStepKey)
    setQuery({
      step: prevStepKey
    })
  }

  const handleContinue = () => {
    const { nextStepKey } = commonHelper.getOnboardingStep(activeStep)
    setActiveStep(nextStepKey)
    setQuery({
      step: nextStepKey
    })
  }

  const handleCreate = () => {
    console.log('Check: ', personalEmployeeForm.getValues())
  }

  const handleGetDisabledContinueAction = () => {
    switch (activeStep) {
      case EOnboardingStep.Personal:
        return !personalEmployeeForm.formState.isValid
      default:
        return true
    }
  }

  useEffect(() => {
    setQuery({
      step: activeStepKey
    })
  }, [])

  return (
    <>
      {/* Header */}
      <HeaderUpsertEmployee activeStep={activeStep} />
      {/* Form */}
      {activeStep === EOnboardingStep.Personal && <PersonalEmployeeForm form={personalEmployeeForm} />}

      {/* Action */}
      <ActionUpsertEmployee
        onCancel={handleCancel}
        activeStep={activeStep}
        onBack={handleBack}
        onContinue={handleContinue}
        onCreate={handleCreate}
        disabledContinueAction={handleGetDisabledContinueAction()}
      />
    </>
  )
}

export default UpsertEmployee
