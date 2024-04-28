import { GraphQLError } from "graphql";

import {
  MutationCreateSentimentArgs,
  Sentiment,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const createSentimentResolver = async (
  _: unknown,
  { sentiment: name }: MutationCreateSentimentArgs,
  { dbConnection }: CustomContext,
): Promise<Sentiment> => {
  const sentiment = await dbConnection.query<Sentiment>(
    `INSERT INTO sentiment (name) VALUES ($1) RETURNING *`,
    [name],
  );

  if (sentiment.rowCount !== null && sentiment.rowCount > 0) {
    return sentiment.rows[0];
  } else {
    throw new GraphQLError("No sentiment created", {
      extensions: { code: "NO_SENTIMENT_CREATED" },
    });
  }
};
