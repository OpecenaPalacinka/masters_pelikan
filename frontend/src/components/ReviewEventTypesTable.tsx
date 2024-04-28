import { Table, TableHeader, TableBody, Row, Column, Cell } from '@/components/ui/Table'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_EVENT_TYPES_FOR_REVIEW_QUERY } from '@/graphql/queries/get-all-event-types-for-review'
import { ACCEPT_EVENT_TYPE_MUTATION } from '@/graphql/queries/accept-event-type'
import { DECLINE_EVENT_TYPE_MUTATION } from '@/graphql/queries/decline-event-type'
import { EVENT_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/event-types-by-user-id'
import { NOT_FILLED_EVENT_TYPES_QUERY } from '@/graphql/queries/not-filled-event-types.ts'
import { toast } from 'sonner'
import { TableLoadingSkeleton } from '@/components/TableLoadingSkeleton.tsx'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError.tsx'

export const ReviewEventTypesTable = () => {
  const { data, loading, error } = useQuery(ALL_EVENT_TYPES_FOR_REVIEW_QUERY)
  const eventTypes = data?.getEventTypesForReview
  const [acceptEventType] = useMutation(ACCEPT_EVENT_TYPE_MUTATION, {
    refetchQueries: [
      ALL_EVENT_TYPES_FOR_REVIEW_QUERY,
      EVENT_TYPES_BY_USER_ID_QUERY,
      NOT_FILLED_EVENT_TYPES_QUERY
    ]
  })
  const [declineEventType] = useMutation(DECLINE_EVENT_TYPE_MUTATION, {
    refetchQueries: [ALL_EVENT_TYPES_FOR_REVIEW_QUERY, EVENT_TYPES_BY_USER_ID_QUERY]
  })

  if (loading) {
    return <TableLoadingSkeleton />
  }

  if (error) {
    return <FetchResolvedWithError />
  }

  return (
    <Table className={'w-full max-w-full table-fixed'}>
      <TableHeader>
        <Column isRowHeader>Event Type</Column>
        <Column isRowHeader>Duration</Column>
        <Column className={'w-40'}>Actions</Column>
      </TableHeader>
      <TableBody
        renderEmptyState={() => (
          <div className={'flex min-h-48 flex-col items-center justify-center gap-y-4 px-2.5 py-3'}>
            <div className={'flex flex-col items-center justify-center gap-y-2'}>
              <Text size={'h4'} weight={'semibold'} as={'span'}>
                No events to review
              </Text>
              <Text
                size={'body1'}
                weight={'normal'}
                color={'gray'}
                className={'mx-auto max-w-prose text-center'}
                as={'span'}
              >
                Currently no events requiring review.
              </Text>
            </div>
          </div>
        )}
      >
        {eventTypes && eventTypes.length > 0
          ? eventTypes.map(
              (eventType) =>
                eventType && (
                  <Row>
                    <Cell>{eventType.name}</Cell>
                    <Cell>{eventType.duration === 1 ? 'Date' : 'Interval'}</Cell>
                    <Cell>
                      <div className={'flex gap-x-2'}>
                        <Button
                          size={'sm'}
                          onPress={async () => {
                            try {
                              const { data } = await acceptEventType({
                                variables: {
                                  eventTypeId: eventType.event_type_id
                                }
                              })
                              if (data) {
                                toast.success('Event type was accepted')
                              }
                            } catch (error) {
                              toast.error('Event type failed to be accepted')
                            }
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          size={'sm'}
                          solid={'destructive'}
                          onPress={async () => {
                            try {
                              const { data } = await declineEventType({
                                variables: {
                                  eventTypeId: eventType.event_type_id
                                }
                              })
                              if (data) {
                                toast.success('Event type was declined!')
                              }
                            } catch (error) {
                              toast.error('Event type failed to be declined')
                            }
                          }}
                        >
                          Discard
                        </Button>
                      </div>
                    </Cell>
                  </Row>
                )
            )
          : null}
      </TableBody>
    </Table>
  )
}
