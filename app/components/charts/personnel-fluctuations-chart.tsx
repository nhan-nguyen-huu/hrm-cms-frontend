'use client'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import CardCustom from '~/components/customs/card-custom'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '~/components/ui/chart'

const chartData = [
  {
    month: 'T4',
    recruitment: 18,
    resignation: 7
  },
  {
    month: 'T5',
    recruitment: 25,
    resignation: 11
  },
  {
    month: 'T6',
    recruitment: 21,
    resignation: 8
  },
  {
    month: 'T7',
    recruitment: 32,
    resignation: 14
  },
  {
    month: 'T8',
    recruitment: 27,
    resignation: 10
  },
  {
    month: 'T9',
    recruitment: 38,
    resignation: 17
  }
]

const chartConfig = {
  recruitment: {
    label: 'Tuyển mới',
    color: '#3b82f6'
  },
  resignation: {
    label: 'Nghỉ việc',
    color: '#f97316'
  }
} satisfies ChartConfig

const PersonnelFluctuationsChart = () => {
  return (
    <CardCustom title='Biến động nhân sự 6 tháng gần nhất'>
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
          />

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
          />
        </LineChart>
      </ChartContainer>
    </CardCustom>
  )
}

export default PersonnelFluctuationsChart
