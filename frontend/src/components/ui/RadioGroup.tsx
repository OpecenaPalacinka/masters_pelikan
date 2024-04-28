import { Radio as RACRadio, RadioGroup as RACRadioGroup } from 'react-aria-components'
import type {
  RadioProps as RACRadioProps,
  RadioGroupProps as RACRadioGroupProps
} from 'react-aria-components'

import { cx, cva } from '@/lib/cva'
import { VariantProps } from 'cva'

const radioGroupStyles = cva({
  base: 'group flex gap-1.5',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    },
    invalid: {
      true: 'text-red-400'
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
})

export type RadioGroupProps = RACRadioGroupProps & VariantProps<typeof radioGroupStyles>

export const RadioGroup = (props: RadioGroupProps) => {
  const { orientation, invalid, className, ...radioGrouProps } = props

  return (
    <RACRadioGroup
      isInvalid={invalid}
      className={radioGroupStyles({ orientation, invalid, className })}
      {...radioGrouProps}
    />
  )
}

const radioStyles = cva({
  base: [
    'relative h-4 w-4 rounded-full outline-none ring-1 ring-gray-500 ring-offset-0',
    'after:absolute after:left-1/2 after:top-1/2 after:block after:h-3 after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-slate-700 after:opacity-0 after:transition-opacity after:duration-200 group-rac-selected:after:opacity-100',
    'group-rac-focus:ring-blue-300 group-rac-focus:ring-2'
  ],
  variants: {
    invalid: {
      true: 'group-rac-invalid:ring-red-500 group-rac-focus:ring-red-300'
    }
  }
})

type RadioProps = RACRadioProps & VariantProps<typeof radioStyles>

export function Radio(props: RadioProps) {
  const { className, children, ...radioProps } = props

  return (
    <RACRadio
      className={cx(
        'group flex items-center gap-2 text-sm/snug text-slate-900 outline-none',
        'rac-invalid:text-red-500',
        className
      )}
      {...radioProps}
    >
      {({ isInvalid }) => (
        <>
          <div className={radioStyles({ className, invalid: isInvalid })} />
          {children}
        </>
      )}
    </RACRadio>
  )
}
