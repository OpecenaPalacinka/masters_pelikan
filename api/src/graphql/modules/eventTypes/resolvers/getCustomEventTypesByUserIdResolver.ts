import {
  EventType,
  QueryGetCustomEventTypesByUserIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getCustomEventTypesByUserIdResolver = async (
  _: unknown,
  { userId }: QueryGetCustomEventTypesByUserIdArgs,
  { dbConnection }: CustomContext,
): Promise<EventType[]> => {
  const eventTypes = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE user_id = $1 ORDER BY name",
    [userId],
  );

  if (eventTypes.rowCount !== null && eventTypes.rowCount > 0) {
    return eventTypes.rows;
  } else {
    return [];
  }
};
