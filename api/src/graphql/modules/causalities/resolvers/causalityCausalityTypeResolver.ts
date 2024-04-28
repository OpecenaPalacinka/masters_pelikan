import {
  Causality,
  CausalityType,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const causalityCausalityTypeResolver = async (
  parent: Causality,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<CausalityType> => {
  const causalityType = await dbConnection.query<CausalityType>(
    "SELECT * FROM causality_types WHERE causality_types_id = $1",
    [parent.causality_type_id],
  );

  return causalityType.rows[0];
};
