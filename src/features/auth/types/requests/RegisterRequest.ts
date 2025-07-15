import { TypedRequest } from "@/shared/types/TypedRequest";
import { RegisterDto } from "../dto/RegisterDto";

export type RegisterRequest = TypedRequest<
    {}, 
    {}, 
    RegisterDto
>;