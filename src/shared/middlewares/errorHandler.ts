import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../errors/ApiError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            errors: err.errors,
        });
        return;
    }

    console.error(err);

    res.status(500).json({
        success: false,
        errors: [{ error_code: "server_error", message: "Erreur interne du serveur." }],
    });
}