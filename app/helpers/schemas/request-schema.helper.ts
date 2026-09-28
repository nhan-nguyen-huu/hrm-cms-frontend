import z from 'zod'
import { EReviewRequestFormKey } from '~/shared/enums/form.enum'

// Approve / reject a request; the note to the employee is optional (design placeholder "tuỳ chọn")
export const getReviewRequestSchema = () =>
  z.object({
    [EReviewRequestFormKey.Note]: z.string().trim()
  })

export type TReviewRequestSchema = z.infer<ReturnType<typeof getReviewRequestSchema>>
