import { GraphQLError } from "graphql";
import {
  EventType,
  MutationDeleteEventTypeArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const deleteEventTypeResolver = async (
  _: unknown,
  { eventTypeId }: MutationDeleteEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  try {
    const deleted = await dbConnection.query<EventType>(
      `DELETE FROM event_types WHERE event_type_id = $1 RETURNING *`,
      [eventTypeId],
    );

    return deleted.rows[0];
  } catch (err) {
    throw new GraphQLError("Error occurred - not deleted", {
      extensions: {
        code: "FAILED_DELETE_EVENT_TYPE",
      },
    });
  }
};
