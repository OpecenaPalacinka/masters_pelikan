import {
  Event,
  EventToType,
  QueryGetAllEventsWithTypeByUserIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getAllEventsWithTypesByUserIdResolver = async (
  _: unknown,
  { userId }: QueryGetAllEventsWithTypeByUserIdArgs,
  { dbConnection }: CustomContext,
): Promise<EventToType[]> => {
  const events = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY happened ASC",
    [userId],
  );
  const eventIds = events.rows.map((event) => event.event_id);
  const eventsToTypes = await dbConnection.query<EventToType>(
    "SELECT * FROM events_to_types WHERE event_id = ANY($1)",
    [eventIds],
  );

  if (eventsToTypes.rowCount !== null && eventsToTypes.rowCount > 0) {
    return eventsToTypes.rows;
  } else {
    return [];
  }
};
