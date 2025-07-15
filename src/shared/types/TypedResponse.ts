import { Response } from "express";
import { ApiErrorData } from "./ApiErrorData";

interface ApiError {
    success: false;
    errors: ApiErrorData[];
}

interface ApiSuccess<T = any> {
    success: true;
    data?: T;
}

export type TypedResponse<TSuccessData = any, ErrorType = ApiError> = Response<ApiSuccess<TSuccessData> | ErrorType>;