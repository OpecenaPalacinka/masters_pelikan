import { DateInput as RACDateInput, DateSegment as RACDateSegment } from 'react-aria-components'
import type { DateInputProps as RACDateInputProps } from 'react-aria-components'
import { cva } from '@/lib/cva'
import type { VariantProps } from 'cva'

const dateInputStyles = cva({
  base: [
    'group inline-flex rounded-sm w-full text-sm/snug px-2 outline-none ring-1 ring-gray-200 ring-offset-0 text-slate-900 placeholder:text-gray-400 items-center',
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

export type DateInputProps = Omit<RACDateInputProps, 'children'> &
  VariantProps<typeof dateInputStyles>

export const DateInput = (props: DateInputProps) => {
  const { size, invalid = true, className, ...dateInputProps } = props

  return (
    <RACDateInput className={dateInputStyles({ size, invalid, className })} {...dateInputProps}>
      {(segment) => (
        <RACDateSegment
          className={
            'py-0.25 mx-0.5 inline-flex rounded-sm px-0.5 outline-none rac-placeholder-shown:text-gray-400 rac-focus:ring-2 rac-focus:ring-blue-300'
          }
          segment={segment}
        />
      )}
    </RACDateInput>
  )
}
