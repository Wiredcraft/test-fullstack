import {
  DeleteSessionPayload,
  DeleteSessionResult,
} from "store/api-service/actions";
import { ApiService } from "../api";

/**
 * Destroy one session, by calling the backend to delete the session (with tokens)
 *
 * @export
 * @param {ApiService} ctx
 * @param {DeleteSessionPayload} payload
 * @returns {Promise<DeleteSessionResult>}
 */
export async function destroySession(
  ctx: ApiService,
  payload: DeleteSessionPayload
): Promise<DeleteSessionResult> {
  return await ctx.request({
    method: "DELETE",
    url: "session",
  });
}
