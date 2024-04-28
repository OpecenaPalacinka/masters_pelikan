import {
    User,
} from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../../types/types'
import { getClient } from '../../../../libs/dbConnection'

export const getAllUsersResolver = async (
    _: unknown,
    __: unknown,
    { dbConnection }: CustomContext,
): Promise<User[]> => {
    const users = await dbConnection.query<User>('SELECT * FROM users')

    if (users.rowCount !== null && users.rowCount > 0) {
        return users.rows;
    } else {
        return [];
    }
}
