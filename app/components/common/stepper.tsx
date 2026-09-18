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
    <section className='flex items-center gap-3 w-full flex-col sm:flex-row'>
      {steps?.map((step, i) => {
        const isCompleted = i < activeStep
        const isActive = i === activeStep
        const isDisabled = i > activeStep

        return (
          <Fragment key={i}>
            <section className='flex items-center gap-2 shrink-0'>
              <section
                className={cn(
                  'size-7.5 rounded-full flex items-center justify-center border border-border',
                  isCompleted && 'bg-primary text-white',
                  isActive && 'bg-primary text-white',
                  isDisabled && 'bg-muted text-[#93A2B6]'
                )}
              >
                {isCompleted ? <Check className='size-3.75' /> : <span className='size-xs font-bold'>{i + 1}</span>}
              </section>
              <section className='flex flex-col'>
                <p
                  className={cn('font-bold text-[12.5px]', isActive && 'text-primary ', isDisabled && 'text-[#93A2B6]')}
                >
                  {step?.title}
                </p>
                <p className='text-[10.5px] text-[#93A2B6]'>{step?.description}</p>
              </section>
            </section>
            {i !== (steps?.length ?? 0) - 1 && (
              <div className='flex-1'>
                <Separator className={cn(isCompleted && 'bg-primary h-0.5!')} />
              </div>
            )}
          </Fragment>
        )
      })}
    </section>
  )
}

export default Stepper
