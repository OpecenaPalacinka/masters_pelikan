import { Popover as RACPopover } from 'react-aria-components'
import type { PopoverProps as RACPopoverProps } from 'react-aria-components'
import { cx } from '@/lib/cva'

export interface PopoverProps extends Omit<RACPopoverProps, 'children'> {
  children: React.ReactNode
}

export const Popover = (props: PopoverProps) => {
  const { children, offset = 8, className, ...popoverProps } = props

  return (
    <RACPopover
      offset={offset}
      className={cx(
        'rounded-lg border border-gray-200 bg-white bg-clip-padding shadow-xl',
        className
      )}
      {...popoverProps}
    >
      {children}
    </RACPopover>
  )
}
