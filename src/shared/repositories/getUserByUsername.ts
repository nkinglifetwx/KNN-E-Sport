import { PoolConnection, RowDataPacket } from "mysql2/promise"
import { User } from "../db/models/User";

export async function getUserByUsername(connection: PoolConnection, username: string): Promise<User | null> {
    const [rows] = await connection.execute<(User & RowDataPacket)[]>('SELECT * FROM users WHERE username = ?', [username]);

    return rows[0] || null;
}