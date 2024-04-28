import { gql } from '@/__generated__/gql'

export const GET_NUMBER_OF_EVENTS_BY_USER_ID_QUERY = gql(`
    query GetNumberOfEventsByUserId($userId: Int!) {
      getNumberOfEventsByUserId(userId: $userId) {
        user_id
        number_of_events
      }
    }
`)
