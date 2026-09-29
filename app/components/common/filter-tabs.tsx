import clsx from 'clsx'
import { TabsList, Tabs as TabsRoot, TabsTrigger } from '~/components/ui/tabs'
import type { IFilterTabItem } from '~/shared/models/common.model'

interface IFilterTabsProps {
  items: IFilterTabItem[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

// Pill tabs that filter data in place (no route change), on top of shadcn Tabs — e.g. request status "Chờ duyệt · 14".
// For tabs that switch pages use components/common/tabs.tsx
const FilterTabs = ({ items, value, onValueChange, className }: IFilterTabsProps) => {
  return (
    <TabsRoot value={value} onValueChange={(next) => onValueChange(String(next))} className={className}>
      <TabsList className='h-auto! flex-wrap justify-start gap-2 bg-transparent p-0'>
        {items.map((item) => (
          <TabsTrigger
            key={item.key}
            value={item.key}
            className={clsx(
              'h-9 flex-none rounded-full border-border! bg-white px-4 text-[13px] font-medium text-[#3E4E63]',
              'data-active:border-app-secondary! data-active:bg-app-secondary! data-active:font-semibold data-active:text-white!'
            )}
          >
            {item.label}
            {item.count != null && <span>· {item.count}</span>}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsRoot>
  )
}

export default FilterTabs
