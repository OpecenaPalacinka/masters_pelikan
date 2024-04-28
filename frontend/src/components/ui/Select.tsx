'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import type { VariantProps } from 'cva'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react'

import { cva } from '@/lib/cva'

export const selectStyles = cva({
  base: [
    'px-3 outline-none text-sm/snug ring-1 ring-gray-200 ring-offset-0 rounded-sm flex gap-x-2 items-center justify-between data-[placeholder]:truncate',
    'focus-visible:ring-blue-300 focus-visible:ring-2'
  ],
  variants: {
    size: {
      normal: 'h-10',
      lg: 'h-12'
    },
    invalid: {
      true: 'ring-red-500 focus-visible:ring-red-300 data-[placeholder]:text-red-400'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export type SelectProps = SelectPrimitive.SelectProps &
  VariantProps<typeof selectStyles> & {
    placeholder?: string
    className?: string
    id?: string
  }

export const Select = React.forwardRef(
  (props: React.PropsWithChildren<SelectProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { size, invalid, id, className, placeholder, children, ...selectProps } = props

    return (
      <div className={'relative'} ref={ref}>
        <SelectPrimitive.Root {...selectProps}>
          <SelectPrimitive.Trigger id={id} className={selectStyles({ size, invalid, className })}>
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <FontAwesomeIcon icon={faChevronDown} size={'lg'} className={'text-slate-900'} />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position={'popper'}
              className={
                'relative -left-px z-50 overflow-hidden rounded-sm border border-gray-200 bg-white data-[side=bottom]:translate-y-1.5'
              }
            >
              <SelectPrimitive.Viewport
                className={
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-2'
                }
              >
                {children}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
    )
  }
)

export function SelectOption(props: React.PropsWithChildren<{ value: string; default?: boolean }>) {
  return (
    <SelectPrimitive.Item
      value={props.value}
      defaultChecked={props.default}
      className={
        'relative flex h-10 items-center rounded-sm px-1.5 text-sm/snug text-slate-900 outline-none transition-colors hover:bg-gray-100 focus-visible:ring-1 focus-visible:ring-gray-300'
      }
    >
      <SelectPrimitive.ItemText>{props.children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        className={'absolute right-1 inline-flex items-center text-slate-900'}
      >
        <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
