import { Text } from '@/components/ui/Text'
import { Separator } from '@/components/ui/Sepator'
import { legendBoxColors } from '@/components/TimelineLegendItem'
import { format } from 'date-fns'
import { EditEvent } from '@/components/EditEvent.tsx'
import { EventToType } from '@/__generated__/graphql.ts'
import { AddAntecedent } from '@/components/AddAntecedent.tsx'
import { AddSuccedent } from '@/components/AddSuccedent.tsx'

type TimelineProps = {
  eventTypeId: number
  order: number
  dateStart: string
  dateEnd?: string | null
  title: string
  description: string
  eventToType: EventToType
}

export const TimelineItem = (props: TimelineProps) => {
  const { eventTypeId, order, dateStart, dateEnd, title, description, eventToType } = props

  const formattedDateStart = format(new Date(dateStart), 'dd. M. yyyy')
  const formattedDateEnd = dateEnd ? format(new Date(dateEnd), 'dd. M. yyyy') : null

  return (
    <div className={'relative z-10 flex flex-col'}>
      {order !== 0 && (
        <div className={'absolute left-1/2 top-[22px] -translate-x-1/2 rotate-180'}>
          <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'0 0 512 512'}
            width={12}
            height={12}
            className={'fill-gray-400'}
          >
            <path
              d={
                'M290.5 51.8C283.3 39.5 270.2 32 256 32s-27.3 7.5-34.5 19.8l-216 368c-7.3 12.4-7.3 27.7-.2 40.1S25.7 480 40 480H472c14.3 0 27.6-7.7 34.7-20.1s7-27.8-.2-40.1l-216-368z'
              }
            />
          </svg>
        </div>
      )}
      <div className={'-mb-px ml-6'}>
        <AddAntecedent eventId={eventToType.event_id.event_id} />
      </div>
      <div className={'z-20 flex rounded border border-gray-200 bg-white'}>
        <div
          className={legendBoxColors({
            color: eventTypeId as never,
            className: 'h-auto w-3 rounded-l rounded-r-none'
          })}
        />
        <div className={'w-full'}>
          <div className={'flex items-center justify-between px-2.5 pt-3'}>
            <Text size={'body1'} color={'gray'} as={'span'} className={'uppercase'}>
              {formattedDateStart.toString()}{' '}
              {formattedDateEnd && `- ${formattedDateEnd.toString()}`}
            </Text>
            <EditEvent
              event_id={eventToType.event_id}
              event_type_id={eventToType.event_type_id}
              events_to_types_id={eventToType.events_to_types_id}
            />
          </div>
          <Separator className={'my-2'} />
          <div className={'px-2.5 pb-3'}>
            <Text size={'h3'} weight={'semibold'} className={'mb-2 mt-1 max-w-[40ch]'}>
              {title}
            </Text>
            <Text size={'body1'} className={'max-w-[70ch]'}>
              {description}
            </Text>
          </div>
        </div>
      </div>
      <div className={'-mt-px mr-6 flex justify-end'}>
        <AddSuccedent eventId={eventToType.event_id.event_id} />
      </div>
    </div>
  )
}
