import { PoolConnection } from 'mysql2/promise';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { insertUser } from '../repositories/insertUser';
import { insertSession } from '../repositories/insertSession';
import { ApiError } from '@/shared/errors/ApiError';

export interface Session {
    id: number;
    uuid: string;
    user_id: number;
    refresh_token_hex: string;
    expires_at: Date;
    created_at: Date;
}

export async function createSession(
    connection: PoolConnection,
    user_id: number,
    days_valid = 7
): Promise<{id: number, refresh_token_hex: string}> {
    const uuid = uuidv4();
    const refreshTokenHex = randomBytes(32).toString('hex');

    try {
        const [result] = await insertSession(connection, uuid, user_id, refreshTokenHex, days_valid);

        return { id: result.insertId, refresh_token_hex: refreshTokenHex };
    } catch (err: any) {
        throw new ApiError(500)
    }
}
