import { GraphQLError } from "graphql";

import {
  MutationCreateCausalityTypeArgs,
  CausalityType,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const createCausalityTypeResolver = async (
  _: unknown,
  { name: name }: MutationCreateCausalityTypeArgs,
  { dbConnection }: CustomContext,
): Promise<CausalityType> => {
  const causalityType = await dbConnection.query<CausalityType>(
    `INSERT INTO causality_types (name) VALUES ($1) RETURNING *`,
    [name],
  );

  if (causalityType.rowCount !== null && causalityType.rowCount > 0) {
    return causalityType.rows[0];
  } else {
    throw new GraphQLError("No causality type created", {
      extensions: { code: "NO_CAUSALITY_TYPE_CREATED" },
    });
  }
};
