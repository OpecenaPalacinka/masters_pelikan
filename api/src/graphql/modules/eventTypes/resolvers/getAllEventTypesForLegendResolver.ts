import { EventType } from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getAllEventTypesForLegendResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<EventType[]> => {
  const eventTypes = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE (custom = false) ORDER BY name",
  );

  const customEventType: EventType = {
    __typename: "EventType",
    event_type_id: 12,
    name: "Community",
    duration: 2,
    custom: true,
    accepted: true,
  };

  const eventTypesAll = [...eventTypes.rows, customEventType];
  if (eventTypesAll && eventTypesAll.length > 0) {
    return eventTypesAll;
  } else {
    return [];
  }
};
