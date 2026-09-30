import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { chartHelper } from '~/helpers/chart.helper'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers/date.helper'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EDepartment } from '~/shared/enums/common.enum'
import type { IOverviewSummary } from '~/shared/models/overview.model'

interface IDepartmentHeadcountChartProps {
  summary?: IOverviewSummary
}

// "Nhân sự theo phòng ban" — horizontal bar per department
const DepartmentHeadcountChart = ({ summary }: IDepartmentHeadcountChartProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const items = summary?.departmentHeadcounts ?? []
  const categories = items.map((item) =>
    getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: item.department })
  )

  return (
    <CardCustom
      title={t('title.headcountByDepartment')}
      classNameCardTitle='text-[15px] font-bold normal-case text-app-secondary'
      action={
        <span className='text-[12.5px] text-[#93A2B6]'>
          {t('common.peopleAtDate', {
            count: summary?.activeEmployeeCount ?? 0,
            date: dateHelper.formatDate(summary?.updatedAt, DATE_FORMAT_SLASH, '-')
          })}
        </span>
      }
    >
      <Chart
        type='bar'
        height={Math.max(items.length * 36, 120)}
        options={chartHelper.getHorizontalBarOptions(categories)}
        series={[{ name: t('common.headcount'), data: items.map((item) => item.headcount ?? 0) }]}
      />
    </CardCustom>
  )
}

export default DepartmentHeadcountChart
