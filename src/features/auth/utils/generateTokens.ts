import jwt from 'jsonwebtoken';
import { AccessTokenPayload, RefreshTokenPayload, TokenPair } from '../types/Tokens';
import { CookieOptions } from 'express';

export function generateAccessToken(userId: number) {
    const payload: AccessTokenPayload = { user_id: userId };
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
}

export function generateRefreshToken(sessionId: number, refresh_hex: string) {
    const payload: RefreshTokenPayload = { sid: sessionId, refresh_hex };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
}

export function getTokenPair(userId: number, sessionId: number, refresh_hex: string): TokenPair {
    const access_token = generateAccessToken(userId);
    const refresh_token = generateRefreshToken(sessionId, refresh_hex);
    return { access_token, refresh_token };
}

export function getTokenCookieOptions(token: "refresh_token" | "access_token"): CookieOptions {
    if (token === "refresh_token") return { httpOnly: true,  secure: process.env.NODE_ENV === 'PROD', sameSite: process.env.NODE_ENV === 'PROD' ? 'strict' : 'lax', path: '/api/auth/refresh', maxAge: 7 * 24 * 60 * 60 * 1000 };
    else if (token === "access_token") return { httpOnly: true,  secure: process.env.NODE_ENV === 'PROD', sameSite: process.env.NODE_ENV === 'PROD' ? 'strict' : 'lax', maxAge: 15 * 60 * 1000 };
    else throw new Error(`Valeur incorrecte pour le paramètre token : ${token}. Il doit être "refresh_token" ou "access_token."`);
}