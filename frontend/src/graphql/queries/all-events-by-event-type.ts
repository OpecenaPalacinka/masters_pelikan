import { gql } from '@/__generated__/gql'

export const ALL_EVENTS_BY_EVENT_TYPE_QUERY = gql(`
    query GetAllEventsByEventType($eventType: Int!) {
      getAllEventsByEventType(eventType: $eventType) {
        event_id
        user_id {
          user_id
          email
          firstname
          lastname
          registred
          role_id {
          role_id
          name
        }
        }
        happened
        ended
        description
        label
        sentiment_id {
          name
          sentiment_id
        }
  }
}
`)
