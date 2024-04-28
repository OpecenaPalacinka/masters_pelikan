import React from 'react'
import { Button as RACButton } from 'react-aria-components'
import type { ButtonProps as RACButtonProps } from 'react-aria-components'
import type { VariantProps } from 'cva'
import { cva } from '@/lib/cva'

export const buttonStyles = cva({
  base: 'font-medium rounded-sm transition-colors cursor-default inline-flex justify-center items-center ring-1 ring-offset-1 ring-transparent outline-none',
  variants: {
    solid: {
      primary: ['bg-blue-500 text-white', 'rac-hover:bg-blue-600', 'rac-focus:ring-blue-700'],
      destructive: ['bg-red-500 text-white', 'rac-hover:bg-red-600', 'rac-focus:ring-red-700'],
      unset: null
    },
    outline: {
      primary: [
        'border border-blue-500 bg-transparent text-blue-500',
        'rac-hover:bg-blue-100',
        'rac-focus:ring-blue-300 ring-offset-0'
      ],
      destructive: [
        'border border-red-500 bg-transparent text-red-500',
        'rac-hover:bg-red-100',
        'rac-focus:ring-red-300 ring-offset-0'
      ],
      unset: null
    },
    ghost: {
      true: 'bg-transparent rac-hover:bg-gray-100'
    },
    size: {
      icon: 'p-2',
      sm: 'text-sm/tight px-3 py-2 min-w-[65px]',
      normal: 'text-sm/tight px-3.5 py-[11.25px]',
      lg: 'text-base/tight px-5 py-3.5',
      unset: 'text-sm/tight'
    },
    isDisabled: {
      true: [
        'cursor-not-allowed bg-gray-200 text-gray-500 border-none',
        'rac-hover:bg-gray-300',
        'rac-focus:ring-gray-400 ring-offset-1'
      ]
    },
    isLoading: {
      true: 'relative cursor-progress'
    }
  },
  defaultVariants: {
    solid: 'primary',
    size: 'normal'
  }
})

export type ButtonProps = RACButtonProps &
  VariantProps<typeof buttonStyles> & {
    children?: React.ReactNode
    asChild?: boolean
  }

export const Button = (props: ButtonProps) => {
  const {
    solid,
    outline,
    ghost,
    size,
    isDisabled,
    isLoading,
    className,
    children,
    ...buttonProps
  } = props

  const disabled = isDisabled || isLoading

  return (
    <RACButton
      className={buttonStyles({
        solid,
        outline,
        ghost,
        size,
        isDisabled: disabled,
        isLoading,
        className
      })}
      {...buttonProps}
    >
      {isLoading ? (
        <>
          <span className={'invisible contents'}>{children}</span>
          <span className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>...</span>
        </>
      ) : (
        children
      )}
    </RACButton>
  )
}
