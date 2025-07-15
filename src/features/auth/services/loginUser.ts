import { ApiError } from "@/shared/errors/ApiError";
import { findUserByUsername } from "@/shared/services/findUserByUsername";
import { withTransaction } from "@/shared/utils/withTransaction";
import { PoolConnection } from "mysql2/promise";
import { verifyPassword } from "../utils/password";
import { createSession } from "./createSession";
import { getTokenPair } from "../utils/generateTokens";
import { TokenPair } from "../types/Tokens";

export function loginUser(username: string, password: string): Promise<TokenPair> {
    return withTransaction(async (connection: PoolConnection) => {

        const user = await findUserByUsername(connection, username);

        if (!user) {
            throw new ApiError(404, { error_code: 'user_not_found', message: "L'utilisateur n'a pas ete trouve." });
        }
    
        if (await verifyPassword(user.password_hash, password) === false) {
            throw new ApiError(401, { error_code: 'invalid_password', message: 'Mot de passe incorrect' });
        }
    
        const session = await createSession(connection, user.id, 7);
    
        const tokens = getTokenPair(user.id, session.id, session.refresh_token_hex);

        return tokens;
    })
}