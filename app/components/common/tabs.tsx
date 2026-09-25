import clsx from 'clsx'
import { matchPath, useLocation, useNavigate } from 'react-router'
import { TabsList, Tabs as TabsRoot, TabsTrigger } from '~/components/ui/tabs'
import type { ITabItem } from '~/shared/models/common.model'

interface ITabsProps {
  items: ITabItem[]
  className?: string
  // e.g. 'border-b-0' when the tabs sit inside a card that already draws a divider
  listClassName?: string
}

// Route-driven tabs on top of shadcn Tabs (line variant): the URL decides the active tab, clicking navigates
const Tabs = ({ items, className, listClassName }: ITabsProps) => {
  const location = useLocation()
  const navi = useNavigate()
  const activeKey = items.find((item) => matchPath({ path: item.to, end: false }, location.pathname))?.key ?? null

  return (
    <TabsRoot
      value={activeKey}
      onValueChange={(value) => {
        const item = items.find((tab) => tab.key === value)
        if (item && !item.disabled) navi(item.to)
      }}
      className={className}
    >
      <TabsList
        variant='line'
        className={clsx('h-9! w-full justify-start gap-6 rounded-none border-b border-[#E4E9F0] p-0', listClassName)}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.key}
            value={item.key}
            disabled={item.disabled}
            className={clsx(
              'h-full flex-none rounded-none px-0 text-[13px] font-normal text-[#6E7F96] hover:text-primary',
              'data-active:font-semibold data-active:text-primary',
              'after:bg-primary group-data-horizontal/tabs:after:-bottom-px'
            )}
          >
            {item.label}
            {item.count != null && (
              <span className='rounded-full bg-[#FBF0E2] px-1.5 text-[10px] font-bold text-[#B2650F]'>
                {item.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsRoot>
  )
}

export default Tabs
