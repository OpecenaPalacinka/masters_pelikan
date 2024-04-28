import {
  Event,
  QueryGetAllEventsByUserIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { format } from "date-fns";

export const getAllEventsByUserIdResolver = async (
  _: unknown,
  { userId }: QueryGetAllEventsByUserIdArgs,
  { dbConnection }: CustomContext,
): Promise<Event[]> => {
  const events = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY happened ASC",
    [userId],
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
