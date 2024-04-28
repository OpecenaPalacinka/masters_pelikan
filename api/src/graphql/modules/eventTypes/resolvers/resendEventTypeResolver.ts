import { GraphQLError } from "graphql";
import {
  EventType,
  MutationResendEventTypeArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const resendEventTypeResolver = async (
  _: unknown,
  { eventTypeId }: MutationResendEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  try {
    const eventType = await dbConnection.query<EventType>(
      `UPDATE event_types SET accepted = null WHERE event_type_id = $1 RETURNING *`,
      [eventTypeId],
    );

    return eventType.rows[0];
  } catch (err) {
    throw new GraphQLError("Error occurred - not resend", {
      extensions: {
        code: "FAILED_RESEND_EVENT_TYPE",
      },
    });
  }
};
