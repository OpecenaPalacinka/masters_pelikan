import { GraphQLError } from "graphql";
import {
  EventType,
  MutationDeclineEventTypeArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const declineEventTypeResolver = async (
  _: unknown,
  { eventTypeId }: MutationDeclineEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  try {
    const eventType = await dbConnection.query<EventType>(
      `UPDATE event_types SET accepted = false WHERE event_type_id = $1 RETURNING *`,
      [eventTypeId],
    );

    return eventType.rows[0];
  } catch (err) {
    throw new GraphQLError("Error occurred - not resend", {
      extensions: {
        code: "FAILED_DECLINED_EVENT_TYPE",
      },
    });
  }
};
