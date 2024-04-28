import * as argon2 from "argon2";
import { GraphQLError } from "graphql";
import {
  MutationResetPasswordArgs,
  User,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const resetPasswordResolver = async (
  _: unknown,
  { userId, newPassword1, newPassword2 }: MutationResetPasswordArgs,
  { dbConnection }: CustomContext,
): Promise<string> => {
  if (newPassword1 === newPassword2) {
    const passwordHash = await argon2.hash(newPassword1);

    const user = await dbConnection.query<User>(
      `UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *`,
      [passwordHash, userId],
    );

    return "Success!";
  } else {
    throw new GraphQLError("Passwords do not match", {
      extensions: {
        code: "FAILED_TO_CHANGE_PASSWORD",
      },
    });
  }
};
