import { gql } from '@/__generated__/gql'

export const SIGNUP_MUTATION_QUERY = gql(`
  mutation signUp($signUp: SignUp!) {
    signUp(signUp: $signUp) {
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
