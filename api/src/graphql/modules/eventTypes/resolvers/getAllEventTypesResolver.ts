import { EventType } from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getAllEventTypesResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<EventType[]> => {
  const eventTypes = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE (custom = false) OR (accepted = true) ORDER BY name",
  );

  if (eventTypes.rowCount !== null && eventTypes.rowCount > 0) {
    return eventTypes.rows;
  } else {
    return [];
  }
};
