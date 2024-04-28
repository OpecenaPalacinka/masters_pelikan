import { cva } from '@/lib/cva'

const indicatorStyles = cva({
  base: 'w-2 h-2 rounded-full shrink-0',
  variants: {
    status: {
      positive: 'bg-green-500',
      neutral: 'bg-orange-400',
      negative: 'bg-red-600'
    }
  }
})

type IndicatorProps = React.ComponentPropsWithoutRef<'div'> & {
  // Hard type variants as undefined isn't option here
  status: 'positive' | 'neutral' | 'negative'
}

export function Indicator(props: IndicatorProps) {
  const { status, className, ...sepatorProps } = props

  return <div className={indicatorStyles({ status, className })} {...sepatorProps} />
}
