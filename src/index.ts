import express, { NextFunction, Request, Response, Router } from "express";
import authRouter from "@/features/auth/routes/authRouter";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from "./shared/middlewares/errorHandler";

dotenv.config();

const app = express();

const API_PORT = process.env.API_PORT || 3000;
const API_HOST = process.env.API_HOST || "localhost";

const FRONTEND_PORT = process.env.FRONTEND_PORT || 3001;
const FRONTEND_HOST = process.env.FRONTEND_HOST || "localhost";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `${FRONTEND_HOST}:${FRONTEND_PORT}`,
    credentials: true,
}));

app.listen(API_PORT, () => {

    if (!process.env.JWT_ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is not defined.");
    if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET is not defined.");

    if (process.env.NODE_ENV === "DEV") console.log("[WARN] SERVER RUNNING IN DEVELOPMENT MODE. [WARN]");

    console.log(`Server running on ${API_HOST}:${API_PORT}`);
});

app.use("/api/auth", authRouter as Router);

app.use("/public", express.static("public"));


app.use(errorHandler);

