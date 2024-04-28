import { gql } from '@/__generated__/gql'

export const EVENT_TYPES_BY_USER_ID_QUERY = gql(`
    query GetCustomEventTypesByUserId($userId: Int!) {
      getCustomEventTypesByUserId(userId: $userId) {
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
