import { gql } from '@/__generated__/gql'

export const LOGIN_MUTATION_QUERY = gql(`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
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
      token
      role
    }
  }
`)
