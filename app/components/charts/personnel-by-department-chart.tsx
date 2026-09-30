'use client'

import { useTranslation } from 'react-i18next'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import CardCustom from '~/components/customs/card-custom'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EDepartment } from '~/shared/enums/common.enum'
import type { IDepartmentHeadcount } from '~/shared/models/overview.model'

interface IPersonnelByDepartmentChartProps {
  items?: IDepartmentHeadcount[]
  // Right side of the card header, e.g. "248 người · 16/09/2026"
  description?: string
}

// Height per department row, so the card grows with the number of departments
const ROW_HEIGHT = 34

// "Nhân sự theo phòng ban" — horizontal bar per department, value at the end of the bar (design CmsTongQuan)
const PersonnelByDepartmentChart = ({ items = [], description }: IPersonnelByDepartmentChartProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const chartConfig = {
    headcount: {
      label: t('common.headcount'),
      color: 'var(--primary)'
    }
  } satisfies ChartConfig
  const chartData = items.map((item) => ({
    department: getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: item.department }),
    headcount: item.headcount ?? 0
  }))

  return (
    <CardCustom
      title={t('title.headcountByDepartment')}
      classNameCardTitle='text-[15px] font-bold normal-case text-app-secondary'
      action={description ? <span className='text-[12.5px] text-[#93A2B6]'>{description}</span> : undefined}
    >
      <ChartContainer
        config={chartConfig}
        className='aspect-auto w-full'
        style={{ height: Math.max(chartData.length * ROW_HEIGHT, 120) }}
      >
        <BarChart accessibilityLayer data={chartData} layout='vertical' margin={{ left: 8, right: 40 }}>
          <YAxis
            dataKey='department'
            type='category'
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={110}
            fontSize={13}
          />
          <XAxis dataKey='headcount' type='number' hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
          <Bar dataKey='headcount' fill='var(--color-headcount)' radius={2} barSize={16}>
            <LabelList
              dataKey='headcount'
              position='right'
              offset={10}
              className='fill-foreground font-bold'
              fontSize={13}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardCustom>
  )
}

export default PersonnelByDepartmentChart
