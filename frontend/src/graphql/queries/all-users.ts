import { gql } from '@/__generated__/gql'

export const ALL_USERS_QUERY = gql(`
    query getAllUsers {
        getAllUsers {
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
    }
`)
