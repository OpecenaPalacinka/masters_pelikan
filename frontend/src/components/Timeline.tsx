import { useUserContext } from '@/components/UserContext'
import { useQuery } from '@apollo/client'
import { Text } from '@/components/ui/Text'
import { ALL_EVENTS_WITH_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-with-types-by-user-id'
import { TimelineItem } from '@/components/TimelineItem'
import { EventToType } from '@/__generated__/graphql'
import { Separator } from './ui/Sepator'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError'

export const Timeline = () => {
  const { user } = useUserContext()
  const { data, loading, error } = useQuery(ALL_EVENTS_WITH_TYPES_BY_USER_ID_QUERY, {
    variables: { userId: user!.user_id }
  })

  const groupedByYear: { [year: number]: EventToType[] } = {}

  const sortedResults =
    data?.getAllEventsWithTypeByUserId && data?.getAllEventsWithTypeByUserId.length > 0
      ? data.getAllEventsWithTypeByUserId
          .filter((item): item is EventToType => item !== null)
          .sort((a: EventToType, b: EventToType) => {
            if (a && b) {
              if (a.event_id.happened < b.event_id.happened) {
                return -1
              }
              if (a.event_id.happened > b.event_id.happened) {
                return 1
              }
            }
            return 0
          })
      : []

  sortedResults.forEach((item) => {
    const date = item?.event_id?.happened

    if (date) {
      const year = new Date(date).getFullYear()
      groupedByYear[year] = groupedByYear[year] || []
      groupedByYear[year].push(item)
    }
  })

  const formattedData = Object.keys(groupedByYear).map((year) => {
    const formattedYear = parseInt(year)

    return { year: formattedYear, items: groupedByYear[formattedYear] }
  })

  if (loading) {
    return <TableLoadingSkeleton />
  }

  if (error) {
    return <FetchResolvedWithError />
  }

  return (
    <div>
      <div className={'flex flex-col gap-y-6'}>
        {formattedData.length > 0 ? (
          formattedData.map((yearItem) => (
            <div key={yearItem.year}>
              <Text size={'h1'} weight={'semibold'} as={'h2'} align={'center'} className={'mb-4'}>
                {yearItem.year}
              </Text>
              <div className={'relative flex flex-col gap-y-12'} key={yearItem.items.length}>
                {yearItem.items.map((item, i) => (
                  <TimelineItem
                    key={item.events_to_types_id}
                    eventTypeId={item.event_type_id.event_type_id}
                    order={i}
                    dateStart={item.event_id.happened}
                    dateEnd={item.event_id.ended}
                    title={item.event_type_id.name}
                    description={item.event_id.description}
                    eventToType={item}
                  />
                ))}
                <Separator
                  orientation={'vertical'}
                  className={
                    'absolute left-1/2 top-9 h-[calc(100%-72px)] -translate-x-1/2 bg-gray-400'
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className={'flex min-h-56 flex-col items-center justify-center gap-y-4 px-2.5 py-3'}>
            <div className={'flex flex-col items-center justify-center gap-y-2'}>
              <Text size={'h4'} weight={'semibold'} as={'span'}>
                No created events
              </Text>
              <Text
                size={'body1'}
                weight={'normal'}
                color={'gray'}
                className={'mx-auto max-w-prose text-center'}
                as={'span'}
              >
                You can create new event to get started on the upper right corner.
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
