import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FilterPanelCustom from '~/components/customs/filter-panel-custom'
import type { TFilterPanelProjectFormSchema } from '~/helpers/schema.helper'
import { DATA } from '~/shared/constants/data.constant'
import { EFilterPanelFormKey, EFilterPanelProjectFormKey } from '~/shared/enums/form.enum'
import type { IOption } from '~/shared/models/common.model'

interface IProjectFilterPanelProps {
  form: UseFormReturn<TFilterPanelProjectFormSchema>
  yearOptions: IOption[]
  shownCount: number
  totalCount: number
}

// Filters of the Organization > Project tab
const ProjectFilterPanel = ({ form, yearOptions, shownCount, totalCount }: IProjectFilterPanelProps) => {
  const { t } = useTranslation()
  return (
    <FilterPanelCustom
      form={form}
      fields={[
        {
          type: 'keyword',
          name: EFilterPanelFormKey.Keyword,
          placeholder: t('inputPlaceholder.searchProject')
        },
        {
          type: 'select',
          name: EFilterPanelProjectFormKey.Department,
          placeholder: t('inputPlaceholder.departmentAll'),
          options: DATA.GET_OPTIONS_DEPARTMENT(t),
          hasAllOption: true,
          className: 'w-48'
        },
        {
          type: 'select',
          name: EFilterPanelProjectFormKey.Status,
          placeholder: t('inputLabel.status'),
          options: DATA.GET_OPTIONS_PROJECT_STATUS(t),
          hasAllOption: true
        },
        {
          type: 'select',
          name: EFilterPanelProjectFormKey.Year,
          placeholder: t('inputLabel.period'),
          options: yearOptions,
          hasAllOption: true
        }
      ]}
      extra={
        <p className='text-xs text-[#93A2B6]'>{t('common.showingCount', { shown: shownCount, total: totalCount })}</p>
      }
    />
  )
}

export default ProjectFilterPanel
