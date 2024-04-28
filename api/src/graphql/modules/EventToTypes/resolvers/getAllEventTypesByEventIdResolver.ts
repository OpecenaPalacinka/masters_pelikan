import {
  EventToType,
  QueryGetAllEventTypesByEventIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getAllEventTypesByEventIdResolver = async (
  _: unknown,
  { eventId, skip }: QueryGetAllEventTypesByEventIdArgs,
  { dbConnection }: CustomContext,
): Promise<EventToType[]> => {
  const itemsPerPage = 5;
  let events;
  if (skip == 0) {
    events = await dbConnection.query<EventToType>(
      "SELECT ett.* FROM ( SELECT DISTINCT ON " +
        "(ett.event_type_id) ett.event_type_id FROM events_to_types ett WHERE ett.event_id = ANY($1) ORDER BY ett.event_type_id) AS sub " +
        "JOIN events_to_types ett ON sub.event_type_id = ett.event_type_id WHERE ett.event_id = ANY($1);",
      [eventId],
    );
  } else {
    events = await dbConnection.query<EventToType>(
      "SELECT ett.* FROM ( SELECT DISTINCT ON " +
        "(ett.event_type_id) ett.event_type_id FROM events_to_types ett WHERE ett.event_id = ANY($1) ORDER BY ett.event_type_id LIMIT 5 OFFSET (($2 - 1) * 5)) AS sub " +
        "JOIN events_to_types ett ON sub.event_type_id = ett.event_type_id WHERE ett.event_id = ANY($1);",
      [eventId, skip],
    );
  }

  if (events.rowCount !== null && events.rowCount > 0) {
    return events.rows;
  } else {
    return [];
  }
};
