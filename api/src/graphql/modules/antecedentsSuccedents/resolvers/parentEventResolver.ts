import {
  AntecedentSuccedent,
  Event,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { format } from "date-fns";

export const parentEventResolver = async (
  parent: AntecedentSuccedent,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Event> => {
  const event = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE event_id = $1",
    [parent.event_id],
  );

  event.rows[0].happened = format(
    new Date(event.rows[0].happened),
    "yyyy-MM-dd",
  );
  if (event.rows[0].ended) {
    event.rows[0].ended = format(new Date(event.rows[0].ended), "yyyy-MM-dd");
  }
  return event.rows[0];
};
