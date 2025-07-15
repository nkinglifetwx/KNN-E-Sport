import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { Session } from "../db/models/Session";
import { User } from "../db/models/User";
import { SessionAndUserRow } from "../db/models/SessionAndUserRow";

export async function selectSessionAndUser(connection: PoolConnection, sid: number): Promise<SessionAndUserRow | null> {
    const [rows] = await connection.execute<(SessionAndUserRow & RowDataPacket)[]>(
        `SELECT 
              s.id AS session_id,
              s.uuid AS session_uuid,
              s.user_id,
              s.refresh_token_hex,
              s.created_at AS session_created_at,
              s.expires_at,
              u.id AS user_id,
              u.uuid AS user_uuid,
              u.username,
              u.password_hash,
              u.created_at AS user_created_at,
              u.updated_at AS user_updated_at
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.id = ?`,
        [sid]
    );

    return rows[0] || null;
}