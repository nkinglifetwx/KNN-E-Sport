import { PoolConnection } from "mysql2/promise";
import { ApiError } from "../errors/ApiError";
import { selectSessionAndUser } from "../repositories/getSessionAndUserBySessionId";
import { SessionAndUserRow } from "../db/models/SessionAndUserRow";

export async function findUserAndSessionBySessionId(connection: PoolConnection, sid: number): Promise<SessionAndUserRow> {
    const session = await selectSessionAndUser(connection, sid);
    if (!session) {
        throw new ApiError(404, { error_code: 'session_not_found', message: "La session n'a pas ete trouve." });
    }
    return session;
}
