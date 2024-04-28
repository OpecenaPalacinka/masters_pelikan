import {
  Event,
  QueryGetAllEventsByEventTypeArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { format } from "date-fns";

export const getAllEventsByEventTypeResolver = async (
  _: unknown,
  { eventType }: QueryGetAllEventsByEventTypeArgs,
  { dbConnection }: CustomContext,
): Promise<Event[]> => {
  const eventIdsQuery = await dbConnection.query(
    "SELECT event_id FROM events_to_types WHERE event_type_id = $1",
    [eventType],
  );

  const eventIds = eventIdsQuery.rows.map((item) => item.event_id);

  const events = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE event_id = ANY($1)",
    [eventIds],
  );

  events.rows.map((event: Event) => {
    event.happened = format(new Date(event.happened), "yyyy-MM-dd");
    if (event.ended) {
      event.ended = format(new Date(event.ended), "yyyy-MM-dd");
    }
  });

  if (events.rowCount !== null && events.rowCount > 0) {
    return events.rows;
  } else {
    return [];
  }
};
