import { useState } from 'react'

import { useNavigate } from 'react-router'
import ActionUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/action-upsert-employee'
import HeaderUpsertEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/header-upsert-employee'
import type { eScreenMode } from '~/shared/models/common.model'

interface IUpsertEmployeeProps {
  screenMode: eScreenMode
}
const UpsertEmployee = ({ screenMode }: IUpsertEmployeeProps) => {
  console.log(screenMode)
  const [activeStep, setActiveStep] = useState(0)
  const navi = useNavigate()
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
  return (
    <>
      <HeaderUpsertEmployee activeStep={activeStep} />
      <ActionUpsertEmployee
        onCancel={handleCancel}
        activeStep={activeStep}
        onBack={handleBack}
        onContinue={handleContinue}
        onCreate={handleCreate}
      />
    </>
  )
}

export default UpsertEmployee
