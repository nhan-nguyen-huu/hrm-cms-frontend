import type { ApexOptions } from 'apexcharts'
import { CHART_COLORS } from '~/shared/constants/common.constant'

const FONT_FAMILY = 'inherit'

// Shared look of every ApexCharts chart: no toolbar / zoom, app font, light grid
const getBaseOptions = (): ApexOptions => ({
  chart: {
    fontFamily: FONT_FAMILY,
    toolbar: { show: false },
    zoom: { enabled: false },
    parentHeightOffset: 0
  },
  grid: { borderColor: CHART_COLORS.GRID, strokeDashArray: 0 },
  tooltip: { theme: 'light' },
  dataLabels: { enabled: false },
  legend: { show: false }
})

export const chartHelper = {
  // Horizontal bars with the value at the end of each bar, e.g. headcount by department
  getHorizontalBarOptions: (categories: string[], color = CHART_COLORS.PRIMARY): ApexOptions => {
    const base = getBaseOptions()
    return {
      ...base,
      chart: { ...base.chart, type: 'bar' },
      colors: [color],
      plotOptions: {
        bar: { horizontal: true, barHeight: '52%', borderRadius: 2, dataLabels: { position: 'top' } }
      },
      dataLabels: {
        enabled: true,
        offsetX: 26,
        style: { fontSize: '13px', fontWeight: 700, colors: [CHART_COLORS.TEXT] }
      },
      grid: { show: false, padding: { top: -20, right: 36, bottom: -10 } },
      xaxis: {
        categories,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: { labels: { style: { fontSize: '13px', colors: CHART_COLORS.LABEL }, maxWidth: 140 } },
      states: { hover: { filter: { type: 'none' } } }
    }
  },
  // Lines with markers, the last value labelled, legend drawn by the page (design legend sits in the card header)
  getLineOptions: (categories: string[], colors: string[]): ApexOptions => {
    const base = getBaseOptions()
    return {
      ...base,
      chart: { ...base.chart, type: 'line' },
      colors,
      stroke: { curve: 'straight', width: 2 },
      markers: { size: 4, strokeWidth: 0, hover: { size: 6 } },
      xaxis: {
        categories,
        labels: { style: { fontSize: '11.5px', colors: CHART_COLORS.LABEL } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false }
      },
      yaxis: {
        min: 0,
        tickAmount: 3,
        forceNiceScale: true,
        labels: { style: { fontSize: '11.5px', colors: [CHART_COLORS.LABEL] } }
      }
    }
  }
}
