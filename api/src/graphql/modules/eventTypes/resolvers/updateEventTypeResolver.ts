import { GraphQLError } from "graphql";
import {
  EventType,
  MutationUpdateEventTypeArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const updateEventTypeResolver = async (
  _: unknown,
  { eventTypeId, eventType }: MutationUpdateEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  try {
    const updatedEventType = await dbConnection.query<EventType>(
      `UPDATE event_types SET name = $2, duration = $3, accepted = null WHERE event_type_id = $1 RETURNING *`,
      [eventTypeId, eventType.name, eventType.duration],
    );

    return updatedEventType.rows[0];
  } catch (err) {
    throw new GraphQLError("Error occurred - not resend", {
      extensions: {
        code: "FAILED_UPDATE_EVENT_TYPE",
      },
    });
  }
};
