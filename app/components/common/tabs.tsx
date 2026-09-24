import clsx from 'clsx'
import { NavLink } from 'react-router'

export interface ITabItem {
  key: string
  label: string
  // Absolute route path — the active tab follows the current URL
  to: string
  disabled?: boolean
}

interface ITabsProps {
  items: ITabItem[]
  className?: string
}

const Tabs = ({ items, className }: ITabsProps) => {
  const baseClassName = 'flex items-center h-9 -mb-px border-b-2 text-[13px] transition-colors'
  return (
    <nav className={clsx('flex items-center gap-6 border-b border-[#E4E9F0]', className)}>
      {items.map((item) =>
        item.disabled ? (
          <span
            key={item.key}
            aria-disabled
            className={clsx(baseClassName, 'border-transparent text-[#6E7F96] cursor-not-allowed opacity-60')}
          >
            {item.label}
          </span>
        ) : (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                baseClassName,
                isActive ? 'border-primary font-semibold text-primary' : 'border-transparent text-[#6E7F96]'
              )
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  )
}

export default Tabs
