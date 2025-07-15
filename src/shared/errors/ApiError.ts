import { ApiErrorData } from "../types/ApiErrorData";

export class ApiError extends Error {
    public statusCode: number;
    public errors: ApiErrorData[];

    constructor(
        statusCode: number,
        errors: ApiErrorData | ApiErrorData[] = [{ error_code: "error", message: "Une erreur est survenue" }]
    ) {
        if (!Array.isArray(errors)) errors = [errors];
        super(errors[0].message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}