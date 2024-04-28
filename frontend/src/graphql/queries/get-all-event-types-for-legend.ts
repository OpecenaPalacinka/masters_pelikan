import { gql } from '@/__generated__/gql'

export const ALL_EVENT_TYPES_FOR_LEGEND_QUERY = gql(`
    query GetAllEventTypesForLegend {
      getAllEventTypesForLegend {
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
