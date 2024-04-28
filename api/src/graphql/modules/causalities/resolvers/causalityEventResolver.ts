import { Causality, Event } from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const causalityEventResolver = async (
  parent: Causality,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Event> => {
  const event = await dbConnection.query<Event>(
    "SELECT * FROM events WHERE event_id = $1",
    [parent.event_id],
  );

  return event.rows[0];
};
