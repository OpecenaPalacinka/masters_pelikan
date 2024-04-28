import {
  AntecedentSuccedent,
  EventType,
  QueryGetTopThreeSuccedentArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getTopThreeSuccedentsResolver = async (
  _: unknown,
  { eventTypeId }: QueryGetTopThreeSuccedentArgs,
  { dbConnection }: CustomContext,
): Promise<EventType[]> => {
  const AntecedentSuccedents = await dbConnection.query<AntecedentSuccedent>(
    "SELECT related_type_id, COUNT(*) AS antecedent_count " +
      "FROM antecedents_succedents WHERE event_type_id = $1 AND relationship = 2 " +
      "GROUP BY related_type_id ORDER BY antecedent_count, related_type_id DESC LIMIT 3",
    [eventTypeId],
  );

  const ids = AntecedentSuccedents.rows.map((item) => item.related_type_id);
  const eventTypes = await dbConnection.query<EventType>(
    "SELECT * FROM event_types WHERE event_type_id = ANY($1)",
    [ids],
  );

  if (eventTypes.rowCount !== null && eventTypes.rowCount > 0) {
    return eventTypes.rows;
  } else {
    return [];
  }
};
