import { gql } from '@/__generated__/gql'

export const UPDATE_EVENT_MUTATION = gql(`
    mutation UpdateEvent($updateEventId: Int!, $event: EventInput!) {
  updateEvent(id: $updateEventId, event: $event) {
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
}
`)
