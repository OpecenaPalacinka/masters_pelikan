import { GraphQLError } from "graphql";
import {
  EventType,
  MutationAcceptEventTypeArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const acceptEventTypeResolver = async (
  _: unknown,
  { eventTypeId }: MutationAcceptEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  try {
    const eventType = await dbConnection.query<EventType>(
      `UPDATE event_types SET accepted = TRUE WHERE event_type_id = $1 RETURNING *`,
      [eventTypeId],
    );

    return eventType.rows[0];
  } catch (err) {
    throw new GraphQLError("Error occurred - not accepted", {
      extensions: {
        code: "FAILED_ACCEPT_EVENT_TYPE",
      },
    });
  }
};
