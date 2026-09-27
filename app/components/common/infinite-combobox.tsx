import * as React from 'react'

import { Loader2 } from 'lucide-react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '~/components/ui/combobox'
import { cn } from '~/lib/utils'

const SCROLL_THRESHOLD_PX = 10

interface IInfiniteComboboxBaseProps<TItem> {
  items: TItem[]
  getItemId: (item: TItem) => string | number
  getItemLabel: (item: TItem) => string
  renderItem?: (item: TItem) => React.ReactNode
  onSearchValueChange: (value: string) => void
  isLoading?: boolean
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
  onLoadMore: () => void
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  emptyText?: string
  loadingText?: string
  disabled?: boolean
  className?: string
  'aria-invalid'?: boolean
  autoComplete?: string
}

const useLoadMoreOnScroll = (hasNextPage?: boolean, isFetchingNextPage?: boolean, onLoadMore?: () => void) =>
  React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!hasNextPage || isFetchingNextPage || !onLoadMore) return
      const el = event.currentTarget
      if (el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD_PX) {
        onLoadMore()
      }
    },
    [hasNextPage, isFetchingNextPage, onLoadMore]
  )

function LoadMoreOverlay({ isFetchingNextPage }: { isFetchingNextPage?: boolean }) {
  if (!isFetchingNextPage) return null
  return (
    <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-popover/70'>
      <Loader2 className='size-5 animate-spin text-muted-foreground' />
    </div>
  )
}

interface IInfiniteComboboxProps<TItem> extends IInfiniteComboboxBaseProps<TItem> {
  value: TItem | null
  onValueChange: (value: TItem | null) => void
}

// Debounce and pagination state are owned by the caller; this only renders and reports scroll/search events.
export function InfiniteCombobox<TItem>({
  items,
  value,
  onValueChange,
  getItemId,
  getItemLabel,
  renderItem,
  onSearchValueChange,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  onOpenChange,
  placeholder,
  emptyText = 'No results found.',
  loadingText = 'Loading more…',
  disabled,
  className,
  'aria-invalid': ariaInvalid,
  autoComplete
}: IInfiniteComboboxProps<TItem>) {
  const handleScroll = useLoadMoreOnScroll(hasNextPage, isFetchingNextPage, onLoadMore)

  return (
    <Combobox
      items={items}
      value={value}
      onValueChange={onValueChange}
      onInputValueChange={onSearchValueChange}
      onOpenChange={onOpenChange}
      itemToStringLabel={(item: TItem | null) => (item ? getItemLabel(item) : '')}
      isItemEqualToValue={(a: TItem, b: TItem) => getItemId(a) === getItemId(b)}
      filter={null}
      disabled={disabled}
    >
      <ComboboxInput
        placeholder={placeholder}
        showClear
        disabled={disabled}
        className={className}
        aria-invalid={ariaInvalid}
        autoComplete={autoComplete}
      />
      <ComboboxContent>
        <ComboboxEmpty>{isLoading ? loadingText : emptyText}</ComboboxEmpty>
        <section className='relative'>
          <ComboboxList onScroll={handleScroll} className={cn(items.length > 0 && 'max-h-64')}>
            {(item: TItem) => (
              <ComboboxItem key={getItemId(item)} value={item}>
                {renderItem ? renderItem(item) : getItemLabel(item)}
              </ComboboxItem>
            )}
          </ComboboxList>
          <LoadMoreOverlay isFetchingNextPage={isFetchingNextPage} />
        </section>
      </ComboboxContent>
    </Combobox>
  )
}

interface IInfiniteComboboxMultipleProps<TItem> extends IInfiniteComboboxBaseProps<TItem> {
  value: TItem[]
  onValueChange: (value: TItem[]) => void
}

// Same behaviour as InfiniteCombobox, rendered as removable chips for multi-selection.
export function InfiniteComboboxMultiple<TItem>({
  items,
  value,
  onValueChange,
  getItemId,
  getItemLabel,
  renderItem,
  onSearchValueChange,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  onOpenChange,
  placeholder,
  emptyText = 'No results found.',
  loadingText = 'Loading more…',
  disabled,
  className,
  'aria-invalid': ariaInvalid,
  autoComplete
}: IInfiniteComboboxMultipleProps<TItem>) {
  const anchor = useComboboxAnchor()
  const handleScroll = useLoadMoreOnScroll(hasNextPage, isFetchingNextPage, onLoadMore)

  return (
    <Combobox
      multiple
      items={items}
      value={value}
      onValueChange={onValueChange}
      onInputValueChange={onSearchValueChange}
      onOpenChange={onOpenChange}
      isItemEqualToValue={(a: TItem, b: TItem) => getItemId(a) === getItemId(b)}
      filter={null}
      disabled={disabled}
    >
      <ComboboxChips ref={anchor} className={cn('w-full', className)}>
        <ComboboxValue>
          {(values: TItem[]) => (
            <React.Fragment>
              {values.map((item) => (
                <ComboboxChip key={getItemId(item)}>{getItemLabel(item)}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={values.length ? '' : placeholder}
                autoComplete={autoComplete}
                aria-invalid={ariaInvalid}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{isLoading ? loadingText : emptyText}</ComboboxEmpty>
        <div className='relative'>
          <ComboboxList onScroll={handleScroll} className={cn(items.length > 0 && 'max-h-64')}>
            {(item: TItem) => (
              <ComboboxItem key={getItemId(item)} value={item}>
                {renderItem ? renderItem(item) : getItemLabel(item)}
              </ComboboxItem>
            )}
          </ComboboxList>
          <LoadMoreOverlay isFetchingNextPage={isFetchingNextPage} />
        </div>
      </ComboboxContent>
    </Combobox>
  )
}
