import { gql } from '@/__generated__/gql'

export const TOP_THREE_ANTECEDENTS_QUERY = gql(`
    query GetTopThreeAntecedents($eventTypeId: Int!) {
      getTopThreeAntecedents(eventTypeId: $eventTypeId) {
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
