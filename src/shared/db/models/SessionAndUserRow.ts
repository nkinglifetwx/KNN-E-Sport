export interface SessionAndUserRow {
    session_id: number;
    session_uuid: string;
    user_id: number;
    refresh_token_hex: string;
    session_created_at: Date;
    expires_at: Date;

    user_uuid: string;
    username: string;
    password_hash: string;
    user_created_at: Date;
    user_updated_at: Date;
}