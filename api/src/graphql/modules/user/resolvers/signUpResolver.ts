import * as argon2 from "argon2";
import { GraphQLError } from "graphql";

import {
  User,
  MutationSignUpArgs,
  SignedUser,
  Role,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { createToken } from "../../../../libs/jwt";

export const signUpResolver = async (
  _: unknown,
  { signUp: args }: MutationSignUpArgs,
  { dbConnection }: CustomContext,
): Promise<SignedUser> => {
  const { firstName, lastName, email, password } = args;

  const userByEmail = await dbConnection.query<User>(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email],
  );

  if (userByEmail.rowCount !== null && userByEmail.rowCount > 0) {
    throw new GraphQLError("Email already registered", {
      extensions: { code: "AUTH_IN_USE" },
    });
  }

  const hashedPassword = await argon2.hash(password);

  const user = await dbConnection.query(
    `INSERT INTO users (firstName, lastName, email, password, registred, role_id) VALUES ($1, $2, $3, $4, NOW(), 2) RETURNING *`,
    [firstName, lastName, email.toLowerCase(), hashedPassword],
  );

  const role = await dbConnection.query<Role>(
    `SELECT * FROM roles WHERE role_id = $1`,
    [user.rows[0].role_id],
  );

  if (user.rowCount !== null && user.rowCount > 0) {
    const token = createToken({ user: user.rows[0], role: role.rows[0].name });
    return {
      user: { ...user.rows[0] },
      token,
      role: role.rows[0].name,
    };
  } else {
    throw new GraphQLError("No user found", {
      extensions: { code: "NO_USER_AFTER_REGISTRATION" },
    });
  }
};
