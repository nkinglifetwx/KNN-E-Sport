import { JwtPayload } from "jsonwebtoken"

export interface TokenPair{
    access_token: string,
    refresh_token: string
}

export type RefreshTokenPayload = JwtPayload & {
    sid: number,
    refresh_hex: string
}

export type AccessTokenPayload = JwtPayload & {
    user_id: number
}
