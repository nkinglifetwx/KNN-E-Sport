import { TypedRequest } from "@/shared/types/TypedRequest";
import { AccessTokenPayload } from "../Tokens";

export type MeRequest = TypedRequest<
    {},
    {},
    {},
    {},
    {
        access_token: string;
    },
    {
        access_payload: AccessTokenPayload;
    }
>