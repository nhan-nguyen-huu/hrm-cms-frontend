import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { chartHelper } from '~/helpers/chart.helper'
import { dateHelper } from '~/helpers/date.helper'
import { CHART_COLORS } from '~/shared/constants/common.constant'
import type { IOverviewSummary } from '~/shared/models/overview.model'

interface IHeadcountTrendChartProps {
  summary?: IOverviewSummary
}

const SERIES_COLORS = [CHART_COLORS.PRIMARY, CHART_COLORS.SECONDARY]

// "Biến động nhân sự 6 tháng gần nhất" — new hires vs resignations per month
const HeadcountTrendChart = ({ summary }: IHeadcountTrendChartProps) => {
  const { t } = useTranslation()
  const trend = summary?.headcountTrend ?? []
  const series = [
    { name: t('common.newHires'), data: trend.map((item) => item.newHires ?? 0) },
    { name: t('common.resignations'), data: trend.map((item) => item.resignations ?? 0) }
  ]
  const categories = trend.map((item) =>
    t('common.monthShort', { month: dateHelper.getMonthFromMonthYear(item.month) })
  )
  const baseOptions = chartHelper.getLineOptions(categories, SERIES_COLORS)
  // Label only the latest month, like the design
  const options: ApexOptions = {
    ...baseOptions,
    dataLabels: {
      enabled: true,
      formatter: (value, opts) => (opts?.dataPointIndex === trend.length - 1 ? String(value) : ''),
      background: { enabled: false },
      offsetY: -8,
      style: { fontSize: '13px', fontWeight: 700, colors: SERIES_COLORS }
    }
  }

  return (
    <CardCustom
      title={t('title.headcountTrend')}
      classNameCardTitle='text-[15px] font-bold normal-case text-app-secondary'
      action={
        <section className='flex items-center gap-4'>
          {series.map((item, index) => (
            <span key={item.name} className='flex items-center gap-1.5 text-[12.5px] text-[#40526B]'>
              <span className='size-2.5 rounded-xs' style={{ backgroundColor: SERIES_COLORS[index] }} />
              {item.name}
            </span>
          ))}
        </section>
      }
    >
      <Chart type='line' height={200} options={options} series={series} />
    </CardCustom>
  )
}

export default HeadcountTrendChart
