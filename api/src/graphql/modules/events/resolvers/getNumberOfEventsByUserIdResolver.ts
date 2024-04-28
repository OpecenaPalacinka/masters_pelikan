import {
  Event,
  IdsToNumbers,
  QueryGetAllEventsByUserIdArgs,
  QueryGetAllEventsByUserIdsArgs,
  QueryGetNumberOfEventsByUserIdArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { format } from "date-fns";

export const getNumberOfEventsByUserIdResolver = async (
  _: unknown,
  { userId }: QueryGetNumberOfEventsByUserIdArgs,
  { dbConnection }: CustomContext,
): Promise<IdsToNumbers> => {
  const events = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY happened ASC",
    [userId],
  );

  if (events.rowCount !== null && events.rowCount > 0) {
    return {
      number_of_events: events.rowCount,
      user_id: userId,
    };
  } else {
    return {
      number_of_events: 0,
      user_id: userId,
    };
  }
};
