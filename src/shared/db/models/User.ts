export interface User {
    id: number;
    uuid: string;
    username: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}