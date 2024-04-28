import {
  MenuTrigger as RACMenuTrigger,
  Menu as RACMenu,
  MenuItem as RACMenuItem
} from 'react-aria-components'
import { Popover, PopoverProps } from '@/components/ui/Popover'

import type {
  MenuProps as RACMenuProps,
  MenuItemProps as RACMenuItemProps
} from 'react-aria-components'
import { cx } from '@/lib/cva'

interface MenuProps<T> extends RACMenuProps<T> {
  placement?: PopoverProps['placement']
}

export const MenuTrigger = RACMenuTrigger

export const Menu = <T extends object>(props: MenuProps<T>) => {
  const { className, placement, ...menuProps } = props

  return (
    <Popover placement={placement} className="min-w-[150px]">
      <RACMenu
        className={cx(
          'max-h-[inherit] overflow-auto p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]',
          className
        )}
        {...menuProps}
      />
    </Popover>
  )
}

type MenuItemProps = Omit<RACMenuItemProps, 'children'> & {
  children: React.ReactNode
}

export const MenuItem = (props: MenuItemProps) => {
  const { className, children, ...menuItemProps } = props

  return (
    <RACMenuItem
      className={cx(
        'group flex cursor-default rounded p-2 text-sm/tight outline-none hover:bg-gray-100',
        className
      )}
      {...menuItemProps}
    >
      {children}
    </RACMenuItem>
  )
}
