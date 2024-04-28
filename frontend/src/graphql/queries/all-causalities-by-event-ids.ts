import { gql } from '@/__generated__/gql'

export const ALL_CAUSALITIES_BY_EVENT_IDS_QUERY = gql(`
    query GetAllCausalitiesByEventIds($eventIds: [Int!]!) {
      getAllCausalitiesByEventIds(eventIds: $eventIds) {
        causality_id
        event_id {
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
        causality_type_id {
          causality_types_id
          name
        }
        antecedent
        succedent
      }
    }
`)
