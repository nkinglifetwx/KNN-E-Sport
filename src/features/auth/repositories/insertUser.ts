import { PoolConnection, ResultSetHeader } from 'mysql2/promise';


export async function insertUser(
    connection: PoolConnection,
    uuid: string,
    username: string,
    passwordHash: string
){

    return await connection.execute<ResultSetHeader>(
        `INSERT INTO users (uuid, username, password_hash)
        VALUES (?, ?, ?)`,
        [uuid, username, passwordHash]
    );

}
