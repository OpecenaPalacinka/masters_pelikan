import {
  AntecedentSuccedent,
  EventType,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const relatedEventTypeResolver = async (
  parent: AntecedentSuccedent,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<EventType> => {
  const eventType = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE event_type_id = $1",
    [parent.related_type_id],
  );

  return eventType.rows[0];
};
