import { cva } from '@/lib/cva'
import type { VariantProps } from 'cva'
import { Text as RACText } from 'react-aria-components'
import type { TextProps as RACTextProps } from 'react-aria-components'

export const textStyles = cva({
  variants: {
    size: {
      h1: 'text-4xl/tight',
      h2: 'text-3xl/tight',
      h3: 'text-xl/snug',
      h4: 'text-lg/snug',
      h5: 'text-base/snug',
      body3: 'text-lg',
      body2: 'text-base',
      body1: 'text-sm',
      body0: 'text-xs'
    },
    color: {
      black: 'text-slate-900',
      gray: 'text-slate-500',
      darkGray: 'text-slate-700',
      blue: 'text-blue-500',
      danger: 'text-red-500',
      success: 'text-green-500',
      warning: 'text-orange-500'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-right'
    }
  },
  defaultVariants: {
    size: 'body2',
    color: 'black'
  }
})

export type TextProps = Omit<RACTextProps, 'elementType'> &
  VariantProps<typeof textStyles> & {
    as?: string
    // Use `htmlFor` only if `as` is equal `label`
    htmlFor?: string
  }

export const Text = (props: TextProps) => {
  const { size, color, weight, align, className, as = 'p', ...textProps } = props

  return (
    <RACText
      className={textStyles({ size, color, weight, align, className })}
      elementType={as}
      {...textProps}
    />
  )
}
