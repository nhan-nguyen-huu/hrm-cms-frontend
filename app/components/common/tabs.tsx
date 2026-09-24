import clsx from 'clsx'
import { matchPath, useLocation, useNavigate } from 'react-router'
import { TabsList, Tabs as TabsRoot, TabsTrigger } from '~/components/ui/tabs'

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

// Route-driven tabs on top of shadcn Tabs (line variant): the URL decides the active tab, clicking navigates
const Tabs = ({ items, className }: ITabsProps) => {
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
      <TabsList variant='line' className='h-9! w-full justify-start gap-6 rounded-none border-b border-[#E4E9F0] p-0'>
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
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsRoot>
  )
}

export default Tabs
