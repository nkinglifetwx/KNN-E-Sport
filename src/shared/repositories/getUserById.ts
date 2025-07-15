import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { User } from "../db/models/User";

export async function getUserById(connection: PoolConnection, id: number): Promise<User | null> {
    const [rows] = await connection.execute<(User & RowDataPacket)[]>('SELECT * FROM users WHERE id = ?', [id])

    return rows[0] || null
}