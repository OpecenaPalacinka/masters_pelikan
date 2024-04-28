import { Role, User } from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const userRoleResolver = async (
  parent: User,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Role> => {
  const role = await dbConnection.query<Role>(
    "SELECT * FROM roles WHERE role_id = $1",
    [parent.role_id],
  );

  return role.rows[0];
};
