import { gql } from '@/__generated__/gql'

export const NOT_FILLED_EVENT_TYPES_QUERY = gql(`
   query GetNotFilledEventTypesByUsedId($userId: Int!) {
      getNotFilledEventTypesByUsedId(userId: $userId) {
        event_type_id
        name
        duration
        custom
        accepted
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
