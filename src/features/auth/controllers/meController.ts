import { withTransaction } from "@/shared/utils/withTransaction";
import { MeRequest } from "../types/requests/MeRequest";
import { findUserById } from "@/shared/services/findUserById";
import { MeResponse } from "../types/responses/MeResponse";

export async function meController(req: MeRequest, res: MeResponse, next: any) {
    const user = await withTransaction(async (conn) => await findUserById(conn, req.auth!.access_payload.user_id));
    res.status(200).json({ success: true, data: { id: user.id, username: user.username }});
}