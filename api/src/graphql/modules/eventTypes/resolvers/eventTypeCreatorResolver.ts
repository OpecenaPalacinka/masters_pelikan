import { EventType, User } from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const eventTypeCreatorResolver = async (
  parent: EventType,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<User> => {
  const user = await dbConnection.query<User>(
    "SELECT * FROM users WHERE user_id = $1",
    [parent.user_id],
  );

  return user.rows[0];
};
