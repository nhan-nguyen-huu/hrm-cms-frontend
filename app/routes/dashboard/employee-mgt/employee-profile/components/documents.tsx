import type { IEmployee } from '~/shared/models/employee.model'

interface IDocumentsProfileProps {
  data?: IEmployee
}

const DocumentsProfile = ({}: IDocumentsProfileProps) => {
  return <div>documents</div>
}

export default DocumentsProfile
