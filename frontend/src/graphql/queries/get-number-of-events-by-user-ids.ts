import { gql } from '@/__generated__/gql'

export const GET_NUMBER_OF_EVENTS_BY_USER_IDS_QUERY = gql(`
    query GetNumberOfEventsByUserIds($userIds: [Int!]!) {
      getNumberOfEventsByUserIds(userIds: $userIds) {
        user_id
        number_of_events
      }
    }
`)
