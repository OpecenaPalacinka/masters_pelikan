import { gql } from '@/__generated__/gql'

export const CREATE_EVENT_TYPE_MUTATION = gql(`
    mutation CreateEventType($eventType: EventTypeInput!) {
      createEventType(eventType: $eventType) {
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
`)
