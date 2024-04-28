import { Input as RACInput } from 'react-aria-components'
import type { InputProps as RACInputProps } from 'react-aria-components'
import { cva } from '@/lib/cva'
import type { VariantProps } from 'cva'

const inputStyles = cva({
  base: [
    'rounded-sm w-full text-sm/snug px-3 outline-none ring-1 ring-gray-200 ring-offset-0 text-slate-900 placeholder:text-gray-400',
    'rac-focus:ring-blue-300 rac-focus:ring-2'
  ],
  variants: {
    size: {
      normal: 'h-10',
      lg: 'h-12'
    },
    invalid: {
      true: 'ring-red-500 rac-focus:ring-red-300 placeholder:text-red-400'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export type InputProps = Omit<RACInputProps, 'size'> & VariantProps<typeof inputStyles>

export const Input = (props: InputProps) => {
  const { size, invalid, className, ...inputProps } = props

  return <RACInput className={inputStyles({ size, invalid, className })} {...inputProps} />
}
