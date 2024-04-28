import { Text } from '@/components/ui/Text'
import { useQuery } from '@apollo/client'
import { useUserContext } from '@/components/UserContext'
import { Cell, Column, Row, Table, TableBody, TableHeader } from '@/components/ui/Table.tsx'
import { NOT_FILLED_EVENT_TYPES_QUERY } from '@/graphql/queries/not-filled-event-types.ts'
import { Badge } from './ui/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton.tsx'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError.tsx'

export const DashboardEventsPotentialAdditions = () => {
  const { user } = useUserContext()
  const { data, loading, error } = useQuery(NOT_FILLED_EVENT_TYPES_QUERY, {
    variables: { userId: user!.user_id },
    fetchPolicy: 'network-only'
  })
  const notFilledEventTypes = data?.getNotFilledEventTypesByUsedId

  if (loading) {
    return <TableLoadingSkeleton />
  }

  if (error) {
    return <FetchResolvedWithError />
  }

  return (
    <>
      <Table className={'w-full max-w-full table-fixed'}>
        <TableHeader className={'sticky left-0 top-0'}>
          <Column isRowHeader>Event type name</Column>
          <Column className={'w-28'}>Status</Column>
          <Column className={'w-24'}>Duration</Column>
        </TableHeader>
        <TableBody
          renderEmptyState={() => (
            <div
              className={'flex min-h-48 flex-col items-center justify-center gap-y-4 px-2.5 py-3'}
            >
              <div className={'flex flex-col items-center justify-center gap-y-2'}>
                <Text size={'h4'} weight={'semibold'} as={'span'}>
                  All event types were fulfilled
                </Text>
                <Text
                  size={'body1'}
                  weight={'normal'}
                  color={'gray'}
                  className={'mx-auto max-w-prose text-center'}
                  as={'span'}
                >
                  You've successfully fulfilled all event types. Great job!
                </Text>
                <div
                  className={
                    'flex h-12 w-12 items-center justify-center rounded-full border border-green-700 bg-green-50 text-green-700'
                  }
                >
                  <FontAwesomeIcon icon={faCheck} size={'lg'} />
                </div>
              </div>
            </div>
          )}
        >
          {notFilledEventTypes && notFilledEventTypes.length > 0
            ? notFilledEventTypes.map(
                (eventType) =>
                  eventType && (
                    <Row key={eventType.event_type_id}>
                      <Cell>
                        <Text
                          size={'body1'}
                          weight={'medium'}
                          as={'span'}
                          className={'block truncate'}
                          title={eventType.name}
                        >
                          {eventType.name}
                        </Text>
                      </Cell>
                      <Cell>
                        {eventType.custom === true ? (
                          <Badge label={'Community'} variant={'pink'} />
                        ) : (
                          <Badge label={'General'} variant={'neutral'} />
                        )}
                      </Cell>
                      <Cell>{eventType.duration === 1 ? 'Date' : 'Interval'}</Cell>
                    </Row>
                  )
              )
            : null}
        </TableBody>
      </Table>
    </>
  )
}
