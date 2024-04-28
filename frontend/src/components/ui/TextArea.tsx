import { TextArea as RACTextArea } from 'react-aria-components'
import type { TextAreaProps as RACTextAreaProps } from 'react-aria-components'
import { cva } from '@/lib/cva'
import type { VariantProps } from 'cva'

const textareaStyles = cva({
  base: [
    'rounded-sm w-full text-sm/snug p-3 resize-none outline-none ring-1 ring-gray-200 ring-offset-0 text-slate-900 placeholder:text-gray-400',
    'rac-focus:ring-blue-300 rac-focus:ring-2'
  ],
  variants: {
    size: {
      normal: 'h-20',
      lg: 'h-32'
    },
    invalid: {
      true: 'ring-red-500 rac-focus:ring-red-300 placeholder:text-red-400'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export type TextAreaProps = Omit<RACTextAreaProps, 'size'> & VariantProps<typeof textareaStyles>

export const TextArea = (props: TextAreaProps) => {
  const { size, invalid, className, ...textareaProps } = props

  return <RACTextArea className={textareaStyles({ size, invalid, className })} {...textareaProps} />
}
