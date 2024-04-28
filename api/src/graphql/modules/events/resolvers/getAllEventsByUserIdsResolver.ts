import {
  Event,
  QueryGetAllEventsByUserIdArgs,
  QueryGetAllEventsByUserIdsArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { format } from "date-fns";

export const getAllEventsByUserIdsResolver = async (
  _: unknown,
  { userIds }: QueryGetAllEventsByUserIdsArgs,
  { dbConnection }: CustomContext,
): Promise<Event[]> => {
  const events = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE user_id = ANY($1) ORDER BY happened ASC",
    [userIds],
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
