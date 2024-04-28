import { gql } from '@/__generated__/gql'

export const ALL_EVENT_TYPES_BY_EVENT_ID_QUERY = gql(`
    query GetAllEventTypesByEventId($eventId: [Int!], $skip: Int!) {
      getAllEventTypesByEventId(eventId: $eventId, skip: $skip) {
        events_to_types_id
        event_id {
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
            sentiment_id
            name
          }
        }
        event_type_id {
          event_type_id
          name
          duration
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
          custom
          accepted
        }
      }
}
`)
