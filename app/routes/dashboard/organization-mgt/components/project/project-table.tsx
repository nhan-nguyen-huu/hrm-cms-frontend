import { useTranslation } from 'react-i18next'
import TableCustom from '~/components/customs/table-custom'
import { projectColumn } from '~/helpers/columns/project-column'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import type { IProject } from '~/shared/models/project.model'

interface IProjectTableProps {
  data: IProject[]
  loading?: boolean
  page: number
  totalPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

// Table of the Organization > Project tab
const ProjectTable = ({
  data,
  loading,
  page,
  totalPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}: IProjectTableProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const columns = projectColumn.getList(t, getTranslateEnum)
  return (
    <TableCustom
      columns={columns}
      data={data}
      loading={loading}
      emptyText={t('empty.noData')}
      getRowId={(row) => row.id ?? row.code ?? ''}
      page={page}
      totalPage={totalPage}
      onPageChange={onPageChange}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      disableNavigationAll
    />
  )
}

export default ProjectTable
