import { GraphQLError } from "graphql";

import {
  MutationCreateEventTypeArgs,
  EventType,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const createEventTypeResolver = async (
  _: unknown,
  { eventType: args }: MutationCreateEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  const { name, duration, user_id } = args;

  const eventType = await dbConnection.query<EventType>(
    `INSERT INTO event_types (name, duration, user_id, custom, accepted) VALUES ($1, $2, $3, TRUE, NULL) RETURNING *`,
    [name, duration, user_id],
  );

  if (eventType.rowCount !== null && eventType.rowCount > 0) {
    return eventType.rows[0];
  } else {
    throw new GraphQLError("No event type created", {
      extensions: { code: "NO_EVENT_TYPE_CREATED" },
    });
  }
};
