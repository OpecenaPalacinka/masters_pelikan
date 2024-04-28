import { gql } from '@/__generated__/gql'

export const RESET_USER_PASSWORD_MUTATION = gql(`
    mutation ResetPassword($userId: Int!, $newPassword1: String!, $newPassword2: String!) {
      resetPassword(userId: $userId, newPassword1: $newPassword1, newPassword2: $newPassword2)
    }
`)
