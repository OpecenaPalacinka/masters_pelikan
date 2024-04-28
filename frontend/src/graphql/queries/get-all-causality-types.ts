import { gql } from '@/__generated__/gql'

export const ALL_CAUSALITY_TYPES_QUERY = gql(`
    query GetAllCausalityTypes {
      getAllCausalityTypes {
        causality_types_id
        name
      }
    }
`)
