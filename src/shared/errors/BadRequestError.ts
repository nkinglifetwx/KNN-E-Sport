import { ApiErrorData } from "../types/ApiErrorData";
import { ApiError } from "./ApiError";

export class BadRequestError extends ApiError {
    constructor(errors: ApiErrorData[] = [{ error_code: "bad_request", message: "Requete incorrecte" }]) {
        super(400, errors);
    }
}