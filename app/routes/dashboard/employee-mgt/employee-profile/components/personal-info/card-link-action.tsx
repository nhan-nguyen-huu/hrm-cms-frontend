import type { ComponentProps } from 'react'

import { clsx } from 'cn'

// Small text button in a card header: "Sửa mục này", "+ Thêm", "+ Ghi chú"
const CardLinkAction = ({ className, ...props }: ComponentProps<'button'>) => (
  <button
    type='button'
    className={clsx('text-[12.5px] font-semibold text-primary hover:underline', className)}
    {...props}
  />
)

export default CardLinkAction
