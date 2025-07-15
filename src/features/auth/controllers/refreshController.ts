import pool from "@/shared/db";
import { NextFunction, RequestHandler, Response } from "express";
import { RefreshRequest } from "../types/requests/RefreshRequest";
import { refreshUserTokens } from "../services/refreshUserTokens";
import { ApiError } from "@/shared/errors/ApiError";
import { getTokenCookieOptions } from "../utils/generateTokens";

export const refreshController = async (req: RefreshRequest, res: Response, next: NextFunction): Promise<void> =>{

    if (!req.auth || !req.auth.refresh_payload) throw new ApiError(401, { error_code: 'unauthorized', message: 'Unauthorized' });

    const tokens = await refreshUserTokens(req.auth.refresh_payload.sid, req.auth.refresh_payload.refresh_hex);

    res.cookie('access_token', tokens.access_token, getTokenCookieOptions('access_token'));
    res.cookie('refresh_token', tokens.refresh_token, getTokenCookieOptions('refresh_token'));
    res.status(201).json({ success: true });
}
