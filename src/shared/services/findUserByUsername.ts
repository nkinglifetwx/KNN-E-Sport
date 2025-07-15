import { PoolConnection } from "mysql2/promise";
import { getUserByUsername } from "../repositories/getUserByUsername";
import { ApiError } from "../errors/ApiError";
import { User } from "../db/models/User";

export async function findUserByUsername(connection: PoolConnection, username: string): Promise<User> {
    const user = await getUserByUsername(connection, username);
    if (!user) {
        throw new ApiError(404, { error_code: 'user_not_found', message: "L'utilisateur n'a pas ete trouve." });
    }
    return user;
}