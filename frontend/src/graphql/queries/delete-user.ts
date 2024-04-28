import { gql } from '@/__generated__/gql'

export const DELETE_USER_MUTATION = gql(`
    mutation DeleteUser($userId: Int!) {
      deleteUser(userId: $userId)
    }
`)
