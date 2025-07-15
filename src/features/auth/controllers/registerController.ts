import pool from "@/shared/db";
import { getTokenCookieOptions, getTokenPair } from "@/features/auth/utils/generateTokens";
import { hashPassword } from "@/features/auth/utils/password";
import { Response } from "express";
import { RegisterRequest } from "../types/requests/RegisterRequest";
import registerUser from "../services/registerUser";
import { RegisterResponse } from "../types/responses/RegisterResponse";



export async function registerController(req: RegisterRequest, res: RegisterResponse): Promise<void> {

    const username = req.body.username;
    const password = req.body.password;

    const tokens = await registerUser(username, password);

    res.cookie('access_token', tokens.access_token, getTokenCookieOptions('access_token'));
    res.cookie('refresh_token', tokens.refresh_token, getTokenCookieOptions('refresh_token'));
    res.status(201).json({ success: true, data: { username } });
}