export interface Session {
    id: number;
    uuid: string;
    user_id: number;
    refresh_token_hex: string;
    expires_at: Date;
    created_at: Date;   
}