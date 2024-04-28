import {
  EventToType,
  EventType,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const eventToTypesEventTypeResolver = async (
  parent: EventToType,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  const eventType = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE event_type_id = $1",
    [parent.event_type_id],
  );

  return eventType.rows[0];
};
