import { TypedRequest } from "@/shared/types/TypedRequest";
import { RefreshTokenPayload } from "../Tokens";

export type RefreshRequest = TypedRequest<
    {},
    {},
    {},
    {},
    {
        refresh_token: string;
    },
    {
        refresh_payload: RefreshTokenPayload;
    }
>;