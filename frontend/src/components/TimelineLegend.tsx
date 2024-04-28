import { TimelineLegendItem } from '@/components/TimelineLegendItem'
import { useQuery } from '@apollo/client'
import { ALL_EVENT_TYPES_FOR_LEGEND_QUERY } from '@/graphql/queries/get-all-event-types-for-legend'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton.tsx'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError.tsx'

export const TimelineLegend = () => {
  const { loading, data, error } = useQuery(ALL_EVENT_TYPES_FOR_LEGEND_QUERY)

  if (loading) {
    return <TableLoadingSkeleton />
  }

  if (error) {
    return <FetchResolvedWithError />
  }

  return (
    <div className={'flex flex-col gap-y-3'}>
      <>
        {data && data.getAllEventTypesForLegend.length > 0
          ? data.getAllEventTypesForLegend.map((eventType) => (
              <TimelineLegendItem
                label={eventType.name}
                color={eventType.event_type_id as never}
                key={eventType.event_type_id}
              />
            ))
          : null}
      </>
    </div>
  )
}
