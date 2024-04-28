import { gql } from '@/__generated__/gql'

export const ACCEPT_EVENT_TYPE_MUTATION = gql(`
    mutation AcceptEventType($eventTypeId: Int!) {
        acceptEventType(eventTypeId: $eventTypeId) {
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
