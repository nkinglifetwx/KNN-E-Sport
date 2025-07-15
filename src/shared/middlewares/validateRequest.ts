import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(req: Request, res: Response, next: NextFunction): Promise<void> | void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formatted = errors.array().map((err: any) => {
            const data = typeof err.msg === 'string'
                ? { msg: err.msg, error_code: 'validation_error' }
                : err.msg;

            return {
                field: (err as any).path ?? (err as any).param ?? 'unknown',
                ...data,
            };
        });

        res.status(400).json({ errors: formatted });
        return;
    }

    next();
}
