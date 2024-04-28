import { gql } from '@/__generated__/gql'

export const ALL_EVENTS_BY_USER_IDS_QUERY = gql(`
    query GetAllEventsByUserIds($userIds: [Int!]!) {
      getAllEventsByUserIds(userIds: $userIds) {
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
    }
`)
