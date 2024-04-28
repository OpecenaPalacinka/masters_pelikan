import { GraphQLError } from "graphql";

import {
  MutationCreateCausalityTypeArgs,
  CausalityType,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getAllCausalityTypesResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<CausalityType[]> => {
  const causalityTypes = await dbConnection.query<CausalityType>(
    `SELECT * FROM causality_types order by name`,
  );

  if (causalityTypes.rowCount !== null && causalityTypes.rowCount > 0) {
    return causalityTypes.rows;
  } else {
    throw new GraphQLError("No causality types found", {
      extensions: { code: "NO_CAUSALITY_TYPE_CREATED" },
    });
  }
};
