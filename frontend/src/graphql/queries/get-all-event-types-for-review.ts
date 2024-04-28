import { gql } from '@/__generated__/gql'

export const ALL_EVENT_TYPES_FOR_REVIEW_QUERY = gql(`
    query GetEventTypesForReview {
      getEventTypesForReview {
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
