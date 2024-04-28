import {
  Event,
  Sentiment,
  User,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const eventSentimentResolver = async (
  parent: Event,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Sentiment> => {
  const sentiment = await dbConnection.query<Sentiment>(
    "SELECT * FROM sentiment WHERE sentiment_id = $1",
    [parent.sentiment_id],
  );

  return sentiment.rows[0];
};
