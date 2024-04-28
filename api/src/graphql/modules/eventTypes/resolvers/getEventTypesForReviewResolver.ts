import { EventType } from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getEventTypesForReviewResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<EventType[]> => {
  const eventTypes = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE (custom = true) AND (accepted IS NULL) ORDER BY name",
  );

  if (eventTypes.rowCount !== null && eventTypes.rowCount > 0) {
    return eventTypes.rows;
  } else {
    return [];
  }
};
