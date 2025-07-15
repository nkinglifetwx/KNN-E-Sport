import { PoolConnection } from "mysql2/promise";
import { getUserById } from "../repositories/getUserById";
import { ApiError } from "../errors/ApiError";
import { User } from "../db/models/User";

export async function findUserById(connection: PoolConnection, id: number): Promise<User> {
    const user = await getUserById(connection, id);

    if (!user) {
        throw new ApiError(404, { error_code: 'user_not_found', message: "L'utilisateur n'a pas ete trouve." });
    }
    return user;
}