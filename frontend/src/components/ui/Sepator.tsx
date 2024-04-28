import { Separator as RACSeparator } from 'react-aria-components'
import type { SeparatorProps as RACSeparatorProps } from 'react-aria-components'
import { cva } from '@/lib/cva'
import { VariantProps } from 'cva'

const separatorStyles = cva({
  base: 'bg-gray-200',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})

type SeparatorProps = RACSeparatorProps & VariantProps<typeof separatorStyles>

export function Separator(props: SeparatorProps) {
  const { orientation, className, ...sepatorProps } = props

  return <RACSeparator className={separatorStyles({ orientation, className })} {...sepatorProps} />
}
