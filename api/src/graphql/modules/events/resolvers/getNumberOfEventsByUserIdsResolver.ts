import {
  IdsToNumbers,
  QueryGetNumberOfEventsByUserIdsArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const getNumberOfEventsByUserIdsResolver = async (
  _: unknown,
  { userIds }: QueryGetNumberOfEventsByUserIdsArgs,
  { dbConnection }: CustomContext,
): Promise<IdsToNumbers[]> => {
  const events = await dbConnection.query(
    "SELECT * FROM events WHERE user_id = ANY($1) ORDER BY happened ASC",
    [userIds],
  );

  const usersCount: IdsToNumbers[] = userIds.map((userId) => ({
    user_id: userId,
    number_of_events: 0,
  }));

  events.rows.forEach((event) => {
    if (event && event.user_id !== undefined) {
      const userId = event.user_id;
      const userIndex = usersCount.findIndex((user) => user.user_id === userId);
      if (userIndex !== -1) {
        usersCount[userIndex].number_of_events++;
      }
    }
  });

  if (usersCount.length > 0) {
    return usersCount;
  } else {
    return [];
  }
};
