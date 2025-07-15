import { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export async function insertSession(
    connection: PoolConnection,
    uuid: string,
    user_id: number,
    refresh_token_hex: string,
    days_valid = 7
) {
    return await connection.execute<ResultSetHeader>(
        `INSERT INTO sessions (uuid, user_id, refresh_token_hex, expires_at)
     VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))`,
        [uuid, user_id, refresh_token_hex, days_valid]
    );
}
