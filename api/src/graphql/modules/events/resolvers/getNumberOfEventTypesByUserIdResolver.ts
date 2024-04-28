import {
  Event,
  EventToType,
  IdsToNumbers,
  QueryGetAllEventsByUserIdArgs,
  QueryGetAllEventsByUserIdsArgs,
  QueryGetNumberOfEventsByUserIdArgs,
  QueryGetNumberOfEventTypesByUserIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { format } from "date-fns";

export const getNumberOfEventTypesByUserIdResolver = async (
  _: unknown,
  { userId }: QueryGetNumberOfEventTypesByUserIdArgs,
  { dbConnection }: CustomContext,
): Promise<IdsToNumbers> => {
  const events = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY happened ASC",
    [userId],
  );

  const eventsToTypes = await dbConnection.query<EventToType>(
    "SELECT * FROM events_to_types WHERE event_id = ANY($1)",
    [events.rows.map((event) => event.event_id)],
  );

  const eventTypeIds = new Set();
  eventsToTypes.rows.forEach((row) => {
    eventTypeIds.add(row.event_type_id);
  });

  if (events.rowCount !== null && events.rowCount > 0) {
    return {
      number_of_events: eventTypeIds.size,
      user_id: userId,
    };
  } else {
    return {
      number_of_events: 0,
      user_id: userId,
    };
  }
};
