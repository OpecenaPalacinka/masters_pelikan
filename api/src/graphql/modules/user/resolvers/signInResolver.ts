import * as argon2 from "argon2";
import { GraphQLError } from "graphql";

import { createToken } from "../../../../libs/jwt";
import {
  MutationSignInArgs,
  Role,
  SignedUser,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const signInResolver = async (
  _: unknown,
  { email: rawEmail, password }: MutationSignInArgs,
  { dbConnection }: CustomContext,
): Promise<SignedUser> => {
  const email = rawEmail.toLowerCase();

  const dbResponse = await dbConnection.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );

  if (dbResponse.rowCount === 0) {
    throw new GraphQLError("The user does not exist!", {
      extensions: { code: "AUTH_USER_NOT_EXIST" },
    });
  }

  const role = await dbConnection.query<Role>(
    `SELECT * FROM roles WHERE role_id = $1`,
    [dbResponse.rows[0].role_id],
  );

  const user = dbResponse.rows[0];
  if (await argon2.verify(user.password, password)) {
    const token = createToken({ user: user, role: role.rows[0].name });
    return {
      user: { ...user },
      token,
      role: role.rows[0].name,
    };
  } else {
    throw new GraphQLError("Wrong password!", {
      extensions: { code: "AUTH_PASSWORD_INCORRECT" },
    });
  }
};
