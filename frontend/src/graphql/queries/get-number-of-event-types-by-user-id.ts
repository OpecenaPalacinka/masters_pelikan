import { gql } from '@/__generated__/gql'

export const GET_NUMBER_OF_EVENT_TYPES_BY_USER_ID_QUERY = gql(`
    query GetNumberOfEventTypesByUserId($userId: Int!) {
      getNumberOfEventTypesByUserId(userId: $userId) {
        user_id
        number_of_events
      }
    }
`)
