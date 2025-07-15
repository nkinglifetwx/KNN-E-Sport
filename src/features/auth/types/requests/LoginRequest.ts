import { TypedRequest } from "@/shared/types/TypedRequest";
import { LoginDto } from "../dto/LoginDto";

export type LoginRequest = TypedRequest<
    {}, 
    {}, 
    LoginDto
>;