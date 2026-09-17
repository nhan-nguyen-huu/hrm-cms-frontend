import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '~/components/ui/select'
import { DATA } from '~/shared/constants/data.constant'
import { ELanguage } from '~/shared/enums/common.enum'

const SelectLanguage = () => {
  const { t, i18n } = useTranslation()

  const DATA_LANGUAGE = DATA.GET_LANGUAGE(t)

  const [language, setLanguage] = useState<ELanguage>((i18n.language as ELanguage) || ELanguage.En)

  const selectedLanguage = DATA_LANGUAGE.find((item) => item.value === language)
  return (
    <Select
      value={language}
      onValueChange={(val) => {
        setLanguage(val as ELanguage)
        i18n.changeLanguage(val as ELanguage)
        toast.success(i18n.getFixedT(val as ELanguage)('msg.changeLanguageSuccess'))
      }}
    >
      <SelectTrigger hiddenIcon className='p-0! h-auto! m-0! shadow-none overflow-auto cursor-pointer rounded-full!'>
        {selectedLanguage && <selectedLanguage.icon className='size-7.5 rounded-full' />}
      </SelectTrigger>

      <SelectContent className={'w-42.5!'}>
        <SelectGroup className='flex flex-col gap-1'>
          {DATA_LANGUAGE.map((item) => (
            <SelectItem key={item.value} value={item.value} className='ripple'>
              <section className='flex items-center gap-2'>
                <item.icon className='size-7.5 border border-input rounded-full' />
                <span>{item.label}</span>
              </section>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectLanguage
