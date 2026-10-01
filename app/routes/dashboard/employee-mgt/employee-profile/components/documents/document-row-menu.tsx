import { useState } from 'react'

import { Ellipsis, ExternalLink, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import type { IEmployeeDocument } from '~/shared/models/employee.model'

interface IDocumentRowMenuProps {
  document: IEmployeeDocument
  onDelete: (document: IEmployeeDocument) => void
}

const ITEM_CLASS = 'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-gray-100'

// "⋯" menu of a document row: open the file, delete
const DocumentRowMenu = ({ document, onDelete }: IDocumentRowMenuProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const fileUrl = document.file?.fileUrl
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={t('tables.baseTableKey.action')}
        className='flex size-7 items-center justify-center rounded-md text-[#93A2B6] hover:bg-gray-100'
      >
        <Ellipsis className='size-4' />
      </PopoverTrigger>
      <PopoverContent align='end' className='flex w-44 flex-col gap-0.5 p-1'>
        {fileUrl && (
          <a href={fileUrl} target='_blank' rel='noreferrer' className={ITEM_CLASS} onClick={() => setOpen(false)}>
            <ExternalLink className='size-4 text-[#6E7F96]' />
            {t('action.openFile')}
          </a>
        )}
        <button
          type='button'
          className={`${ITEM_CLASS} text-red-600 hover:bg-red-50`}
          onClick={() => {
            setOpen(false)
            onDelete(document)
          }}
        >
          <Trash2 className='size-4' />
          {t('action.delete')}
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default DocumentRowMenu
