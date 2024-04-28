import { Text } from '@/components/ui/Text'
import { cva } from '@/lib/cva'
import { VariantProps } from 'cva'

const badgeStyles = cva({
  base: 'inline-flex px-2 py-1.5 rounded-full border',
  variants: {
    variant: {
      red: 'bg-red-50 border-red-200 text-red-700',
      green: 'bg-green-50 text-green-700 border-green-700',
      orange: 'bg-orange-50 text-orange-700 border-orange-300',
      neutral: 'bg-gray-50 text-slate-700 border-gray-300',
      pink: 'bg-pink-50 text-pink-700 border-pink-300'
    }
  },
  defaultVariants: {
    variant: 'orange'
  }
})

type BadgeProps = {
  label: string
} & React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof badgeStyles>

export const Badge = (props: BadgeProps) => {
  const { variant, className, label, ...badgeProps } = props

  return (
    <div className={badgeStyles({ variant, className })} {...badgeProps}>
      <Text size={'body0'} color={'black'} as={'span'} className={'capitalize text-inherit'}>
        {label}
      </Text>
    </div>
  )
}
