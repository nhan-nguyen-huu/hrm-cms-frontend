import { useState } from 'react'

import clsx from 'clsx'
import dayjs from 'dayjs'
import { ChevronDownIcon } from 'lucide-react'
import type { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CalendarIcon } from '~/assets/svgs'
import TimeColumn from '~/components/common/time-column'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { DATE_FORMAT_DOT, DATE_TIME_FORMAT_FULL, dateHelper, getDayPickerLocale } from '~/helpers'
import i18n from '~/lib/i18n'
import type { TTimePart } from '~/shared/types/common.type'

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  React.ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect'
> & {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  placeHolder?: string
  isView?: boolean
  showTime?: boolean
  minDateTime?: Date
}

const TIME_COLUMNS = [
  {
    type: 'hour' as const,
    max: 24,
    getValue: (date: Date) => date.getHours()
  },
  {
    type: 'minute' as const,
    max: 60,
    getValue: (date: Date) => date.getMinutes()
  },
  {
    type: 'second' as const,
    max: 60,
    getValue: (date: Date) => date.getSeconds()
  }
]

const updateDateTimePart = (date: Date, type: TTimePart, value: number) => {
  const next = new Date(date)

  switch (type) {
    case 'hour':
      next.setHours(value)
      break
    case 'minute':
      next.setMinutes(value)
      break
    case 'second':
      next.setSeconds(value)
      break
  }

  return next
}

const copyTime = (source: Date, target: Date) => {
  target.setHours(source.getHours(), source.getMinutes(), source.getSeconds())
  return target
}

const clampAfterMin = (date: Date, min?: Date) =>
  min && !dayjs(date).isAfter(min) ? dayjs(min).add(1, 'second').toDate() : date

// Best-case datetime obtainable once this unit is fixed (smaller units maxed out), used to check if unitValue can still land after minDateTime
const endOfUnit = (base: Date, type: TTimePart, unitValue: number) => {
  switch (type) {
    case 'hour':
      return dayjs(base).hour(unitValue).minute(59).second(59)
    case 'minute':
      return dayjs(base).minute(unitValue).second(59)
    case 'second':
      return dayjs(base).second(unitValue)
  }
}

const FormDateTimePickerField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  field,
  fieldState,
  placeHolder = '',
  isView = false,
  showTime = false,
  minDateTime,
  ...calendarProps
}: Props<TFieldValues, TName>) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const value: Date | undefined = field.value

  const locale = getDayPickerLocale(i18n.language)

  const displayValue = value ? dateHelper.formatDate(value, showTime ? DATE_TIME_FORMAT_FULL : DATE_FORMAT_DOT) : null

  const handleDateSelect = (date?: Date) => {
    if (!date) return
    if (showTime && value) {
      copyTime(value, date)
    }
    field.onChange(clampAfterMin(date, minDateTime))
    if (!showTime) {
      setOpen(false)
    }
  }

  const handleTimeChange = (type: TTimePart, value: number) => {
    field.onChange(updateDateTimePart(field.value ?? new Date(), type, value))
  }

  const isTimeUnitDisabled = (type: TTimePart, unitValue: number) => {
    if (!minDateTime || !value || !dayjs(value).isSame(minDateTime, 'day')) return false
    return !endOfUnit(value, type, unitValue).isAfter(minDateTime)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      field.onBlur()
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            type='button'
            variant='outline'
            disabled={isView}
            aria-invalid={fieldState.invalid}
            className='w-full justify-between font-normal'
          />
        }
      >
        <section className='flex items-center gap-3'>
          <CalendarIcon className='text-app-primay size-5' />
          {displayValue ?? <span className='text-[#B4C0CE] text-sm'>{placeHolder}</span>}
        </section>
        <ChevronDownIcon />
      </PopoverTrigger>

      <PopoverContent className={clsx('p-0', showTime ? 'w-auto' : 'w-fit')} align='start'>
        <section className='flex flex-col gap-4'>
          <section className='sm:flex'>
            <Calendar
              defaultMonth={value}
              mode='single'
              selected={value}
              onSelect={handleDateSelect}
              locale={locale}
              captionLayout='dropdown'
              startMonth={new Date(1900, 0)}
              endMonth={new Date(2100, 11)}
              {...calendarProps}
            />
            {showTime && (
              <>
                <section className='flex flex-col sm:flex-row sm:h-75 divide-y sm:divide-y-0 sm:divide-x'>
                  {TIME_COLUMNS.map((column) => (
                    <TimeColumn
                      open={open}
                      key={column.type}
                      max={column.max}
                      value={value ? column.getValue(value) : undefined}
                      onChange={(v) => handleTimeChange(column.type, v)}
                      isDisabled={(v) => isTimeUnitDisabled(column.type, v)}
                    />
                  ))}
                </section>
              </>
            )}
          </section>
          {showTime && (
            <section className='flex justify-end border-t border-input p-4'>
              <Button size='icon' className='w-14 cursor-pointer' onClick={() => setOpen(false)}>
                {t('action.check')}
              </Button>
            </section>
          )}
        </section>
      </PopoverContent>
    </Popover>
  )
}

export default FormDateTimePickerField
