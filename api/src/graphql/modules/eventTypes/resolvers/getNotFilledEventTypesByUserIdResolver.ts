import {
  EventType,
  QueryGetNotFilledEventTypesByUsedIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getNotFilledEventTypesByUserIdResolver = async (
  _: unknown,
  { userId }: QueryGetNotFilledEventTypesByUsedIdArgs,
  { dbConnection }: CustomContext,
): Promise<EventType[]> => {
  const eventsByUserId = await dbConnection.query(
    "SELECT event_id FROM events WHERE user_id = $1",
    [userId],
  );

  const eventToTypes = await dbConnection.query(
    "SELECT DISTINCT event_type_id FROM events_to_types WHERE event_id = ANY($1)",
    [eventsByUserId.rows.map((item) => item.event_id)],
  );

  const ids = eventToTypes.rows.map((row) => row.event_type_id);
  const eventTypes = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE NOT (event_type_id = ANY($1)) AND ((accepted IS NULL AND custom = false) or accepted = true) ORDER BY name",
    [ids],
  );

  if (eventTypes.rowCount !== null && eventTypes.rowCount > 0) {
    return eventTypes.rows;
  } else {
    return [];
  }
};
