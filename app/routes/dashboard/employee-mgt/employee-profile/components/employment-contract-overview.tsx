import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import TableCustom from '~/components/customs/table-custom'
import { employeeMgtColumn } from '~/helpers/columns/employee-mgt-column'
import type { IEmployee } from '~/shared/models/employee.model'

interface IEmploymentContractOverviewProps {
  data?: IEmployee
}
const EmploymentContractOverview = ({}: IEmploymentContractOverviewProps) => {
  const { t } = useTranslation()
  const columns = employeeMgtColumn.getEmploymentContract(t)

  return (
    <>
      <CardCustom title={t('title.employmentContract')}>
        <TableCustom
          columns={columns}
          data={[
            {
              id: 1,
              contractType: 'HĐLĐ 24 tháng',
              contractNumber: '0142/2025/HĐLĐ-SPC',
              effectiveNess: '01/01/2025 - 31/12/2026',
              status: 'Đang hiệu lực'
            },
            {
              id: 2,
              contractType: 'HĐLĐ xác định thời hạn',
              contractNumber: '0142/2024/HĐLĐ-SPC',
              effectiveNess: '04/03/2024 - 31/12/2024',
              status: 'Đang hiệu lực'
            },
            {
              id: 3,
              contractType: 'Thử việc 2 tháng',
              contractNumber: '0142/2024/TV-SPC',
              effectiveNess: '04/01/2024 - 03/03/2024',
              status: 'Hết hiệu lực'
            }
          ]}
          emptyText={t('empty.noData')}
          disableNavigationAll
          isHiddenPagination
        />
      </CardCustom>
    </>
  )
}

export default EmploymentContractOverview
