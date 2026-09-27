import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import TextEditor from '~/components/common/text-editor'
import CardCustom from '~/components/customs/card-custom'
import DialogCustom from '~/components/customs/dialog-custom'
import { Button } from '~/components/ui/button'

const Demo = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const text =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit temporeLorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eligendi inventore, deserunt sit tempore'
  return (
    <section className='flex flex-col gap-4'>
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
