import { PoolConnection } from "mysql2/promise";
import { getTokenPair } from "../utils/generateTokens";
import { hashPassword } from "../utils/password";
import { createSession } from "./createSession";
import { createUser } from "./createUser";
import { withTransaction } from "@/shared/utils/withTransaction";

export default async function registerUser(username: string, password: string) {
    
    return withTransaction(async (connection: PoolConnection) => {

        const passwordHash = await hashPassword(password);
    
        const userResult = await createUser(connection, username, passwordHash);
    
        const session = await createSession(connection, userResult.id, 7);
    
        const tokens = getTokenPair(userResult.id, session.id, session.refresh_token_hex);
    
        return tokens;
    })
}