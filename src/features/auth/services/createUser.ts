import { User } from '@/shared/db/models/User';
import { ApiError } from '@/shared/errors/ApiError';
import { PoolConnection } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { insertUser } from '../repositories/insertUser';

export async function createUser(
    connection: PoolConnection,
    username: string,
    passwordHash: string
): Promise<{ username: string, id: number }> {
    const uuid = uuidv4();
    try {
        const [result] = await insertUser(connection, uuid, username, passwordHash);
        return { username, id: result.insertId};
    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, { error_code: 'username_taken', message: "Le nom d'utilisateur est deja pris." });
        }
        throw err;
    }

}
