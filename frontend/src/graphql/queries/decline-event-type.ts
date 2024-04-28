import { gql } from '@/__generated__/gql'

export const DECLINE_EVENT_TYPE_MUTATION = gql(`
    mutation DeclineEventType($eventTypeId: Int!) {
      declineEventType(eventTypeId: $eventTypeId) {
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
