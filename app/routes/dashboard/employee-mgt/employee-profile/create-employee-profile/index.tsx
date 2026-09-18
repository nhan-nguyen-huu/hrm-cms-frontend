import UpsertEmployee from '~/components/usperts/upsert-employee'
import PageLayout from '~/layouts/page.layout'
import { eScreenMode } from '~/shared/models/common.model'

const CreateEmployeeProfile = () => {
  return (
    <PageLayout>
      <UpsertEmployee screenMode={eScreenMode.Create} />
    </PageLayout>
  )
}

export default CreateEmployeeProfile
