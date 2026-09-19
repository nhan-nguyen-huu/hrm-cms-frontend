import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import PersonalEmployeeForm from '~/components/forms/employee/personal-employee-form'
import { formHelper } from '~/helpers/form.helper'
import { type TPersonalEmployeeSchema, getPersonalEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import ActionUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/action-upsert-employee'
import HeaderUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/header-upsert-employee'
import type { eScreenMode } from '~/shared/models/common.model'

interface IUpsertEmployeeProps {
  screenMode: eScreenMode
}
const UpsertEmployee = ({ screenMode }: IUpsertEmployeeProps) => {
  console.log(screenMode)
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
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
    setActiveStep((prev) => prev - 1)
  }
  const handleContinue = () => {
    setActiveStep((prev) => prev + 1)
  }
  const handleCreate = () => {
    console.log('Check')
  }

  const handleGetDisabledContinueAction = () => {
    switch (activeStep) {
      case 0:
        return !personalEmployeeForm.formState.isValid
      default:
        return true
    }
  }
  return (
    <>
      {/* Header */}
      <HeaderUpsertEmployee activeStep={activeStep} />

      {/* Form */}
      {activeStep === 0 && <PersonalEmployeeForm form={personalEmployeeForm} />}

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
