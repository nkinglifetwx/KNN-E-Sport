import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AccessTokenPayload } from '../types/Tokens';
import { TypedRequest } from '@/shared/types/TypedRequest';
import { ApiError } from '@/shared/errors/ApiError';

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies?.access_token;

    if (!token) {
        return next(new ApiError(401, { error_code: 'missing_token', message: 'Token manquant.' }));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AccessTokenPayload;
        (req as any).auth = { ...(req as any).auth || {}, access_payload: payload };
        next();
    } catch (err: any) {
        console.log(err);
        return next(new ApiError(401, { error_code: 'invalid_token', message: 'Token invalide.' }));
    }
}

export function verifyRefreshToken(req: TypedRequest, res: Response, next: NextFunction) {

    const token = req.cookies?.refresh_token;

    if (!token) {
        return next(new ApiError(401, { error_code: 'missing_token', message: 'Token manquant.' }));
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
        (req as any).auth = { ...(req as any).auth || {}, refresh_payload: payload };
        next();
    } catch (err) {
        console.log(err)
        return next(new ApiError(401, { error_code: 'invalid_token', message: 'Token invalide.' }));
    }
};