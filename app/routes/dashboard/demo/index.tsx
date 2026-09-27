import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FilterPanel from '~/components/common/filter-panel'
import TextEditor from '~/components/common/text-editor'
import CardCustom from '~/components/customs/card-custom'
import DialogCustom from '~/components/customs/dialog-custom'
import { Button } from '~/components/ui/button'
import {
  type TFilterPanelEmployeeProfileFormSchema,
  getFilterPanelEmployeeProfileSchema
} from '~/helpers/schema.helper'
import { DATA } from '~/shared/constants/data.constant'
import { EFilterPanelEmployeeProfileFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelEmployeeProfileFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus]: null
}
const Demo = () => {
  const filterPanelSchema = getFilterPanelEmployeeProfileSchema()
  const filterPanelForm = useForm<TFilterPanelEmployeeProfileFormSchema>({
    resolver: zodResolver(filterPanelSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'all'
  })
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const text =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore'
  return (
    <section className='flex flex-col gap-4'>
      {/* Filter panel */}
      <FilterPanel
        form={filterPanelForm}
        fields={[
          {
            type: 'INPUT_GROUP',
            name: EFilterPanelFormKey.Keyword,
            placeholder: 'Tên, mã nhân viên, email...',
            className: 'max-w-100'
          },
          {
            type: 'DATE_RANGE',
            name: EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus,
            placeholder: 'Chọn ngày',
            className: 'max-w-75'
          },
          {
            type: 'SELECT',
            name: EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus,
            options: DATA.GET_OPTIONS_EMPLOYEE_ACCOUNT_STATUS(t),
            placeholder: 'Chọn account status',
            className: 'w-auto',
            hasAllOption: true
          },
          {
            type: 'SELECT',
            name: EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus,
            options: DATA.GET_OPTIONS_EMPLOYEE_ACCOUNT_STATUS(t),
            placeholder: 'Chọn hợp đồng',
            className: 'w-auto',
            hasAllOption: true
          }
        ]}
      />
      {/* Dialog */}
      <Button onClick={() => setOpen(true)} className='max-w-50'>
        Open dialog
      </Button>
      <DialogCustom
        open={open}
        onOpenChange={setOpen}
        classNameContent='sm:max-w-[700px]'
        cancelText={t('action.cancel')}
        title={'Title'}
        okText='Save'
        footerDescription='This is footer description'
      >
        {text}
      </DialogCustom>

      {/* Card */}
      <CardCustom title='Title' description='Description'>
        {text}
      </CardCustom>

      {/* Text editor */}
      <TextEditor />
    </section>
  )
}

export default Demo
