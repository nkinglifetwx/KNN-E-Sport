import { PoolConnection } from "mysql2/promise";
import { updateValidSession } from "../repositories/updateValidSession";
import { ApiError } from "@/shared/errors/ApiError";
import { findUserAndSessionBySessionId } from "@/shared/services/findUserAndSessionBySessionId";
import { SessionAndUserRow } from "@/shared/db/models/SessionAndUserRow";

export async function updateSession(connection: PoolConnection, sid: number, oldHex: string, newHex: string, daysValid: number = 7): Promise<SessionAndUserRow> {
    
    const affectedRows = await updateValidSession(connection, sid, oldHex, newHex, daysValid);

    if (affectedRows === 0) {
        throw new ApiError(404, { error_code: 'no_valid_session_found', message: "Aucune session valide n'a été trouvée." });
    }

    const sessionAndUser = await findUserAndSessionBySessionId(connection, sid);

    if (!sessionAndUser) {
        throw new ApiError(404, { error_code: 'session_not_found', message: "La session n'a pas ete trouve." });
    }

    return sessionAndUser;
}