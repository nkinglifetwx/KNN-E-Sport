import pool from "@/shared/db";
import { getUserByUsername } from "@/shared/repositories/getUserByUsername";
import { getTokenCookieOptions, getTokenPair } from "@/features/auth/utils/generateTokens";
import { verifyPassword } from "@/features/auth/utils/password";
import { Response } from "express";
import { LoginRequest } from "../types/requests/LoginRequest";
import { findUserByUsername } from "@/shared/services/findUserByUsername";
import { loginUser } from "../services/loginUser";


export async function loginController(req: LoginRequest, res: Response): Promise<void> {
    
    const username = req.body.username;
    const password = req.body.password;

    const tokens = await loginUser(username, password);

    res.cookie('access_token', tokens.access_token, getTokenCookieOptions('access_token'));
    res.cookie('refresh_token', tokens.refresh_token, getTokenCookieOptions('refresh_token'));
    res.status(201).json({ success: true });
}