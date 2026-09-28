import type { TFunction } from 'i18next'
import z from 'zod'
import { EAddProjectMemberFormKey } from '~/shared/enums/form.enum'

export const MAX_TOTAL_ALLOCATION = 100

// getOtherAllocation(employeeId) = % already allocated to the employee's other projects
export const getAddProjectMemberSchema = (t: TFunction, getOtherAllocation: (employeeId: string) => number) =>
  z
    .object({
      [EAddProjectMemberFormKey.Employee]: z
        .string()
        .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
      [EAddProjectMemberFormKey.Role]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
      [EAddProjectMemberFormKey.Allocation]: z
        .string()
        .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
        .refine((value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= MAX_TOTAL_ALLOCATION, {
          message: t('inputValidate.invalidAllocation')
        }),
      [EAddProjectMemberFormKey.JoinedDate]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
      [EAddProjectMemberFormKey.ConfirmOverAllocation]: z.boolean()
    })
    // Spec (design note): total allocation across projects must not exceed 100% unless the exception is confirmed
    .superRefine((values, ctx) => {
      const total =
        getOtherAllocation(values[EAddProjectMemberFormKey.Employee]) +
        Number(values[EAddProjectMemberFormKey.Allocation] || 0)
      if (total > MAX_TOTAL_ALLOCATION && !values[EAddProjectMemberFormKey.ConfirmOverAllocation]) {
        ctx.addIssue({
          code: 'custom',
          path: [EAddProjectMemberFormKey.ConfirmOverAllocation],
          message: t('inputValidate.confirmOverAllocation')
        })
      }
    })

export type TAddProjectMemberSchema = z.infer<ReturnType<typeof getAddProjectMemberSchema>>
