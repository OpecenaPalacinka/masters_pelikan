import { cva, compose } from '@/lib/cva'
import { textStyles } from '@/components/ui/Text'
import { Link as RACLink } from 'react-aria-components'
import type { LinkProps as RACLinkProps } from 'react-aria-components'
import type { VariantProps } from 'cva'

export const linkStyles = cva({
  base: 'cursor-pointer inline-flex rac-focus:ring-1 ring-blue-700 ring-offset-1 outline-none rounded-sm',
  variants: {
    underline: {
      always: 'underline underline-offset-1',
      hover: 'rac-hover:underline underline-offset-1',
      unset: null
    }
  },
  defaultVariants: {
    underline: 'unset'
  }
})

const composedLinkStyles = compose(textStyles, linkStyles)

export type LinkProps = RACLinkProps & VariantProps<typeof composedLinkStyles>

export const Link = (props: Omit<LinkProps, 'isDisabled' | 'isLoading'>) => {
  const { underline, size, color, weight, align, className, ...linkProps } = props

  return (
    <RACLink
      className={composedLinkStyles({ underline, size, color, weight, align, className })}
      {...linkProps}
    />
  )
}
