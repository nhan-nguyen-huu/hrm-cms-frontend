'use client'

import { useTranslation } from 'react-i18next'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'
import type { LabelProps } from 'recharts'
import CardCustom from '~/components/customs/card-custom'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '~/components/ui/chart'
import { dateHelper } from '~/helpers/date.helper'
import type { IHeadcountTrendItem } from '~/shared/models/overview.model'

interface IPersonnelFluctuationsChartProps {
  // New hires / resignations per month, oldest first
  items?: IHeadcountTrendItem[]
}

// "Biến động nhân sự 6 tháng gần nhất" (design CmsTongQuan)
const PersonnelFluctuationsChart = ({ items = [] }: IPersonnelFluctuationsChartProps) => {
  const { t } = useTranslation()
  const chartConfig = {
    recruitment: {
      label: t('common.newHires'),
      color: 'var(--primary)'
    },
    resignation: {
      label: t('common.resignations'),
      color: 'var(--color-amber-600)'
    }
  } satisfies ChartConfig
  const chartData = items.map((item) => ({
    month: t('common.monthShort', { month: dateHelper.getMonthFromMonthYear(item.month) }),
    recruitment: item.newHires ?? 0,
    resignation: item.resignations ?? 0
  }))
  const lastIndex = chartData.length - 1

  // Value label on the latest month only, like the design
  const renderLastLabel =
    (color: string) =>
    ({ x, y, value, index }: LabelProps) =>
      index === lastIndex ? (
        <text x={Number(x)} y={Number(y) - 10} textAnchor='middle' fill={color} fontSize={13} fontWeight={700}>
          {value}
        </text>
      ) : null

  return (
    <CardCustom
      title={t('title.headcountTrend')}
      classNameCardTitle='text-[15px] font-bold normal-case text-app-secondary'
    >
      <ChartContainer config={chartConfig} className='h-75 w-full'>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 35,
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} />

          <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <ChartLegend
            verticalAlign='top'
            align='right'
            content={<ChartLegendContent />}
            wrapperStyle={{
              width: 'auto',
              right: 0,
              left: 'auto'
            }}
          />

          <Line
            dataKey='recruitment'
            type='linear'
            stroke='var(--color-recruitment)'
            strokeWidth={2}
            dot={{
              r: 4,
              fill: 'var(--color-recruitment)'
            }}
            activeDot={{
              r: 6
            }}
          >
            <LabelList content={renderLastLabel('var(--color-recruitment)')} />
          </Line>

          <Line
            dataKey='resignation'
            type='linear'
            stroke='var(--color-resignation)'
            strokeWidth={2}
            dot={{
              r: 4,
              fill: 'var(--color-resignation)'
            }}
            activeDot={{
              r: 6
            }}
          >
            <LabelList content={renderLastLabel('var(--color-resignation)')} />
          </Line>
        </LineChart>
      </ChartContainer>
    </CardCustom>
  )
}

export default PersonnelFluctuationsChart
