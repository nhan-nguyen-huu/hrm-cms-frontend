import { useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'
import { enUS } from 'react-day-picker/locale/en-US'
import { ko } from 'react-day-picker/locale/ko'
import type { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CalendarIcon } from '~/assets/svgs'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { DATE_FORMAT_DOT, dateHelper } from '~/helpers'
import i18n from '~/lib/i18n'
import { ELanguage } from '~/shared/enums/common.enum'

type FormCalendarRangeFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  React.ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect'
> & {
  placeHolder?: string
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  isView?: boolean
}

const FormDateRangePickerField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  placeHolder = '',
  field,
  fieldState,
  isView = false,
  ...calendarProps
}: FormCalendarRangeFieldProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false)
  const validFrom = field.value?.validFrom
  const validTo = field.value?.validTo
  const { t } = useTranslation()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type='button'
            variant='outline'
            className='w-full justify-between text-left font-normal'
            disabled={isView}
            aria-invalid={fieldState.invalid}
          />
        }
      >
        <section className='flex items-center gap-3'>
          <CalendarIcon className='text-muted-foreground size-5' />
          {validFrom ? (
            validTo ? (
              <>
                {dateHelper.formatDate(validFrom, DATE_FORMAT_DOT)} - {dateHelper.formatDate(validTo, DATE_FORMAT_DOT)}
              </>
            ) : (
              dateHelper.formatDate(validFrom, DATE_FORMAT_DOT)
            )
          ) : (
            <span className='text-muted-foreground'>{placeHolder}</span>
          )}
        </section>
        <ChevronDownIcon className='text-muted-foreground' />
      </PopoverTrigger>

      <PopoverContent className='w-auto p-0 gap-0' align='start'>
        <Calendar
          mode='range'
          selected={{
            from: validFrom,
            to: validTo
          }}
          onSelect={(range) => {
            if (!range) return
            field.onChange({
              validFrom: range?.from,
              validTo: range?.to
            })
          }}
          showOutsideDays={false}
          defaultMonth={validFrom}
          numberOfMonths={2}
          startMonth={new Date(1900, 0)}
          endMonth={new Date(2100, 11)}
          captionLayout='dropdown'
          className='border-b border-input'
          locale={i18n.language === ELanguage.Ko ? ko : enUS}
          {...calendarProps}
        />
        <section className='p-2 ml-auto'>
          <Button className='ml-auto h-10! cursor-pointer' onClick={() => setOpen(false)}>
            {t('action.check')}
          </Button>
        </section>
      </PopoverContent>
    </Popover>
  )
}

export default FormDateRangePickerField
