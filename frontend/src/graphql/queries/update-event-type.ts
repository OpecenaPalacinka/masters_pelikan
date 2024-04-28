import { gql } from '@/__generated__/gql'

export const UPDATE_EVENT_TYPE_MUTATION = gql(`
    mutation UpdateEventType($eventTypeId: Int!, $eventType: EventTypeInput!) {
      updateEventType(eventTypeId: $eventTypeId, eventType: $eventType) {
        accepted
        custom
        duration
        name
        event_type_id
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
      }
    }
`)
