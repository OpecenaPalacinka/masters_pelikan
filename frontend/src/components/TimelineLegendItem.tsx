import { Text } from '@/components/ui/Text'
import { cva } from '@/lib/cva'
import { VariantProps } from 'cva'

export const eventTypeColors: { [key: number]: string } = {
  4: 'bg-red-800',
  9: 'bg-orange-600',
  11: 'bg-amber-400',
  5: 'bg-yellow-800',
  7: 'bg-lime-500',
  6: 'bg-green-700',
  8: 'bg-emerald-400',
  3: 'bg-teal-500',
  10: 'bg-cyan-700',
  2: 'bg-sky-400',
  1: 'bg-indigo-600',
  12: 'bg-purple-500'
}

export const legendBoxColors = cva({
  base: 'bg-neutral-800 h-6 w-6 rounded-sm shrink-0',
  variants: {
    color: eventTypeColors
  }
})

type TimelineLegendItemProps = VariantProps<typeof legendBoxColors> & {
  label: string
  boxClassname?: string
}

export const TimelineLegendItem = (props: TimelineLegendItemProps) => {
  const { color, boxClassname, label } = props

  return (
    <div className={'flex items-center gap-x-2'}>
      <div className={legendBoxColors({ color, className: boxClassname })} />
      <Text size={'body1'} weight={'medium'} as={'span'} className={'truncate'} title={label}>
        {label}
      </Text>
    </div>
  )
}
