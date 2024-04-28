import {
  Causality,
  QueryGetAllCausalitiesByEventIdsArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getAllCausalitiesByEventIdsResolver = async (
  _: unknown,
  { eventIds }: QueryGetAllCausalitiesByEventIdsArgs,
  { dbConnection }: CustomContext,
): Promise<Causality[]> => {
  const causalities = await dbConnection.query<Causality>(
    "SELECT * FROM causalities WHERE event_id = ANY($1)",
    [eventIds],
  );

  if (causalities.rowCount !== null && causalities.rowCount > 0) {
    return causalities.rows;
  } else {
    return [];
  }
};
