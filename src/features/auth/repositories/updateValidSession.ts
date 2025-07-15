import { randomBytes } from "crypto";
import { FieldPacket, Pool, PoolConnection, QueryResult, ResultSetHeader } from "mysql2/promise";
import { ApiError } from "@/shared/errors/ApiError";
import { User } from "@/shared/db/models/User";
import { Session } from "@/shared/db/models/Session";

export async function updateValidSession(
    connection: PoolConnection,
    sid: number,
    oldHex: string,
    newHex: string,
    daysValid: number = 7
): Promise<number> {

    console.log("updateValidSession", sid, oldHex, newHex, daysValid);

    const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE sessions
           SET refresh_token_hex = ?, expires_at = DATE_ADD(NOW(), INTERVAL ? DAY)
           WHERE id = ? AND refresh_token_hex = ? AND expires_at > NOW()`,
        [newHex, daysValid, sid, oldHex]
    );

    return result.affectedRows;
}

