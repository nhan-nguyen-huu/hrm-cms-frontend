import { cn } from 'cn'
import { Check } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { Separator } from '~/components/ui/separator'
import type { IStep } from '~/shared/models/common.model'

interface IStepperProps {
  steps?: IStep[]
  activeStep?: number
}

const Stepper = ({ steps, activeStep = 0 }: IStepperProps) => {
  return (
    <section className='flex w-full flex-col sm:flex-row sm:items-center sm:gap-3'>
      {steps?.map((step, i) => {
        const isCompleted = i < activeStep
        const isActive = i === activeStep
        const isDisabled = i > activeStep
        const isLast = i === (steps?.length ?? 0) - 1

        return (
          <Fragment key={i}>
            <section className='flex gap-2 sm:shrink-0 sm:items-center'>
              <section className='flex flex-col items-center'>
                <section
                  className={cn(
                    'size-7.5 shrink-0 rounded-full flex items-center justify-center border border-border',
                    isCompleted && 'bg-primary text-white',
                    isActive && 'bg-primary text-white',
                    isDisabled && 'bg-muted text-[#93A2B6]'
                  )}
                >
                  {isCompleted ? <Check className='size-3.75' /> : <span className='size-xs font-bold'>{i + 1}</span>}
                </section>
                {!isLast && (
                  <span
                    className={cn('mt-1 w-0.5 flex-1 rounded-full bg-border sm:hidden', isCompleted && 'bg-primary')}
                  />
                )}
              </section>
              <section className={cn('flex min-w-0 flex-col justify-center', !isLast && 'pb-4 sm:pb-0')}>
                <p
                  className={cn('font-bold text-[12.5px]', isActive && 'text-primary ', isDisabled && 'text-[#93A2B6]')}
                >
                  {step?.title}
                </p>
                <p className='text-[10.5px] text-[#93A2B6]'>{step?.description}</p>
              </section>
            </section>
            {!isLast && (
              <section className='hidden flex-1 sm:block px-3!'>
                <Separator className={cn(isCompleted && 'bg-primary h-0.5!')} />
              </section>
            )}
          </Fragment>
        )
      })}
    </section>
  )
}

export default Stepper
