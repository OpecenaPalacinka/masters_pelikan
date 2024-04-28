import { Table, TableHeader, TableBody, Row, Column, Cell } from '@/components/ui/Table'
import { useQuery } from '@apollo/client'
import { ALL_EVENTS_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-by-user-id.ts'
import { useUserContext } from '@/components/UserContext.tsx'
import { NOT_FILLED_EVENT_TYPES_QUERY } from '@/graphql/queries/not-filled-event-types.ts'
import { ALL_EVENT_TYPES_BY_EVENT_ID_QUERY } from '@/graphql/queries/all-event-types-by-event-ids.ts'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton.tsx'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError.tsx'

export const ProfileAnalytics = () => {
  const { user } = useUserContext()
  const {
    loading: allEventsLoading,
    data: allEvents,
    error: allEventsError
  } = useQuery(ALL_EVENTS_BY_USER_ID_QUERY, {
    variables: { userId: user!.user_id }
  })

  const eventIds = allEvents?.getAllEventsByUserId.map((event) => event!.event_id)
  const {
    loading: eventItemsAllLoading,
    data: eventItemsAll,
    error: eventItemsError
  } = useQuery(ALL_EVENT_TYPES_BY_EVENT_ID_QUERY, {
    variables: {
      eventId: eventIds,
      skip: 0
    }
  })
  // count.length - 1  __ is real number of elements
  const count: string[] = []
  eventItemsAll?.getAllEventTypesByEventId!.forEach((item) => {
    if (item) {
      if (count[item.event_type_id.event_type_id] === undefined) {
        count[item.event_type_id.event_type_id] = 'idk'
      }
    }
  })
  const {
    loading: emptyEventTypeLoading,
    data: emptyEventType,
    error: emptyEventTypeError
  } = useQuery(NOT_FILLED_EVENT_TYPES_QUERY, {
    variables: { userId: user!.user_id }
  })

  const allLoaded = !allEventsLoading && !eventItemsAllLoading && !emptyEventTypeLoading

  if (allEventsError || eventItemsError || emptyEventTypeError) {
    return <FetchResolvedWithError />
  }

  return (
    <Table className={'w-full'}>
      <TableHeader>
        <Column isRowHeader>Title</Column>
        <Column className={'w-1/4'}>Data</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell>Events Created</Cell>
          <Cell>{allLoaded ? allEvents?.getAllEventsByUserId.length : '-'}</Cell>
        </Row>
        <Row>
          <Cell>Event Types Fulfilled</Cell>
          <Cell>{allLoaded ? (count.length > 0 ? count.length - 1 : 0) : '-'}</Cell>
        </Row>
        <Row>
          <Cell>Empty Event Types</Cell>
          <Cell>{allLoaded ? emptyEventType?.getNotFilledEventTypesByUsedId.length : '-'}</Cell>
        </Row>
      </TableBody>
    </Table>
  )
}
