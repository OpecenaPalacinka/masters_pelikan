import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/Accordion'
import { Text } from '@/components/ui/Text'
import { Separator } from '@/components/ui/Sepator'
import { Indicator } from '@/components/ui/Indicator'
import { ALL_EVENT_TYPES_BY_EVENT_ID_QUERY } from '@/graphql/queries/all-event-types-by-event-ids'
import { useQuery } from '@apollo/client'
import { ALL_EVENTS_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-by-user-id'
import { Event } from '../__generated__/graphql'
import { useSearchParams } from 'react-router-dom'
import { useUserContext } from '@/components/UserContext'
import { Link } from '@/components/ui/Link'
import { GET_NUMBER_OF_EVENT_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/get-number-of-event-types-by-user-id.ts'
import { AccordionLoadingSkeleton } from '@/components/AccordionLoadingSkeleton'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { CreateEvent } from '@/components/CreateEvent.tsx'
import { EditEvent } from '@/components/EditEvent.tsx'
import { ALL_EVENTS_WITH_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-with-types-by-user-id.ts'

interface EventType {
  eventType: string
  events: Event[]
}
export const DashboardEventsResolved = () => {
  const { user } = useUserContext()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '1')

  const userId = parseInt(searchParams.get('userId') ?? '0')

  if (user && userId !== 0 && user.role === 'admin') {
    user.user_id = userId
  }

  const {
    data: events,
    loading: eventsLoading,
    error: eventsError
  } = useQuery(ALL_EVENTS_BY_USER_ID_QUERY, { variables: { userId: user!.user_id } })
  const eventIds = events?.getAllEventsByUserId.map((event) => event!.event_id)
  const {
    data: eventItems,
    loading: eventTypesLoading,
    error: eventTypesError
  } = useQuery(ALL_EVENT_TYPES_BY_EVENT_ID_QUERY, {
    variables: {
      eventId: eventIds,
      skip: page
    }
  })
  const {
    data: distinctEventTypes,
    loading: numberOfEventsLoading,
    error: numberOfEventsError
  } = useQuery(GET_NUMBER_OF_EVENT_TYPES_BY_USER_ID_QUERY, {
    variables: {
      userId: user!.user_id
    }
  })

  const { data: eventToTypes } = useQuery(ALL_EVENTS_WITH_TYPES_BY_USER_ID_QUERY, {
    variables: { userId: user!.user_id }
  })

  const items = eventItems?.getAllEventTypesByEventId
  const formattedEvents: EventType[] = []
  if (items && items.length > 0) {
    items.forEach((item) => {
      if (item) {
        if (formattedEvents[item.event_type_id.event_type_id] === undefined) {
          formattedEvents[item.event_type_id.event_type_id] = { eventType: '', events: [] }
          formattedEvents[item.event_type_id.event_type_id].eventType = item.event_type_id.name
          formattedEvents[item.event_type_id.event_type_id].events.push(item.event_id)
        } else {
          formattedEvents[item.event_type_id.event_type_id].events.push(item.event_id)
        }
      }
    })
  }

  if (eventsLoading || eventTypesLoading || numberOfEventsLoading) {
    return <AccordionLoadingSkeleton />
  }

  if (eventsError || eventTypesError || numberOfEventsError) {
    return <FetchResolvedWithError />
  }

  const allPossiblePages = Math.ceil(
    distinctEventTypes!.getNumberOfEventTypesByUserId.number_of_events / 5
  )

  return (
    <>
      {formattedEvents.length > 0 ? (
        <>
          <Accordion
            type={'single'}
            collapsible={true}
            className={'w-full rounded border border-gray-200'}
          >
            {formattedEvents.map((item, idx) => (
              <AccordionItem
                value={`item-${idx}`}
                key={item.eventType}
                className={
                  'focus-withing:ring-1 odd:bg-gray-50 even:bg-gray-100  focus-within:ring-gray-300 [&:nth-child(even)_[data-content]>div]:bg-gray-50 [&:nth-child(even)_[data-feeling]]:bg-gray-100 [&:nth-child(odd)_[data-content]>div]:bg-white [&:nth-child(odd)_[data-feeling]]:bg-gray-50'
                }
              >
                <AccordionTrigger className={'px-2.5'}>{item.eventType}</AccordionTrigger>
                <AccordionContent>
                  <Accordion
                    type={'single'}
                    collapsible={true}
                    className={'rounded border border-gray-200'}
                  >
                    {item.events.map((event) => (
                      <AccordionItem key={event.event_id} value={event.label}>
                        <AccordionTrigger className={'relative px-2.5'}>
                          <Text
                            size={'body1'}
                            as={'span'}
                            className={'inline-flex h-full items-center gap-x-2 text-left'}
                          >
                            <Text
                              size={'body0'}
                              weight={'normal'}
                              color={'gray'}
                              as={'span'}
                              className={'tabular-nums'}
                            >
                              {event.happened} {event.ended && `- ${event.ended}`}
                            </Text>
                            <Separator orientation={'vertical'} />
                            {event.label}
                          </Text>
                          <div
                            className={
                              'absolute right-10 top-0 z-10 flex -translate-y-1/2 items-center gap-x-1 px-1.5'
                            }
                            data-feeling={'*'}
                          >
                            <Text size={'body0'} weight={'normal'} color={'gray'} as={'span'}>
                              Feeling
                            </Text>
                            <Indicator
                              status={
                                event.sentiment_id?.name
                                  ? (event.sentiment_id.name as never)
                                  : (undefined as never)
                              }
                            />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent
                          className={'relative mb-6 mt-4 rounded-sm border border-gray-200 p-2'}
                          data-content={'*'}
                        >
                          {event.description}
                          <div className={'mt-2 flex justify-end gap-x-2'}>
                            {eventToTypes?.getAllEventsWithTypeByUserId.find(
                              (toFind) => toFind && toFind.event_id.event_id === event.event_id
                            ) ? (
                              <EditEvent
                                event_id={
                                  eventToTypes?.getAllEventsWithTypeByUserId.find(
                                    (toFind) =>
                                      toFind && toFind.event_id.event_id === event.event_id
                                  )!.event_id
                                }
                                event_type_id={
                                  eventToTypes?.getAllEventsWithTypeByUserId.find(
                                    (toFind) =>
                                      toFind && toFind.event_id.event_id === event.event_id
                                  )!.event_type_id
                                }
                                events_to_types_id={
                                  eventToTypes?.getAllEventsWithTypeByUserId.find(
                                    (toFind) =>
                                      toFind && toFind.event_id.event_id === event.event_id
                                  )!.events_to_types_id
                                }
                              />
                            ) : null}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {
            <div className={'mt-2 flex items-center justify-center gap-x-4'}>
              <div className={'inline-flex h-4 w-4 items-center justify-center'}>
                {page != 1 && (
                  <Link
                    size={'body1'}
                    color={'darkGray'}
                    href={`/dashboard/?page=${page - 1}`}
                    className={'h-full w-full justify-center'}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Link>
                )}
              </div>
              <Text size={'body1'} color={'darkGray'} as={'span'}>
                {page} / {allPossiblePages}
              </Text>
              <div className={'inline-flex h-4 w-4 justify-center'}>
                {page != allPossiblePages && (
                  <Link
                    size={'body1'}
                    color={'darkGray'}
                    href={`/dashboard/?page=${page + 1}`}
                    className={'h-full w-full justify-center'}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                )}
              </div>
            </div>
          }
        </>
      ) : (
        <div
          className={
            'flex min-h-48 flex-col items-center justify-center gap-y-4 rounded border border-gray-200 px-2.5 py-3'
          }
        >
          <div className={'flex flex-col items-center justify-center gap-y-2'}>
            <Text size={'h4'} weight={'semibold'} as={'span'}>
              No events found
            </Text>
            <Text
              size={'body1'}
              weight={'normal'}
              color={'gray'}
              className={'mx-auto max-w-prose text-center'}
              as={'span'}
            >
              It looks like you haven't filled in any events yet.
            </Text>
          </div>
          <CreateEvent />
        </div>
      )}
    </>
  )
}
