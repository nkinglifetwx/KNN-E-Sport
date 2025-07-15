import { getTokenPair } from "@/features/auth/utils/generateTokens";
import { PoolConnection } from "mysql2/promise";
import { TokenPair } from "../types/Tokens";
import { withTransaction } from "@/shared/utils/withTransaction";
import { randomBytes } from "crypto";
import { updateSession } from "./updateSession";

export async function refreshUserTokens(session_id: number, refresh_token_hex: string): Promise<TokenPair> {

    return withTransaction(async (connection: PoolConnection) => {

        const newTokenHex = randomBytes(32).toString('hex');

        const updateSessionResult = await updateSession(connection, session_id, refresh_token_hex, newTokenHex, 7);
    
        const tokens = getTokenPair(updateSessionResult.user_id, updateSessionResult.session_id, updateSessionResult.refresh_token_hex);
    
        return tokens;
    })

}
