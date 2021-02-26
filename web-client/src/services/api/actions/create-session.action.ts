import {
  CreateSessionPayload,
  CreateSessionResult,
  getRealAuthenticationType,
} from "store/api-service/actions";
import { ApiService } from "../api";

/**
 * Multifunctional action for session creation, including:
 *
 * - login (local, oauth....)
 * - registration (local, oauth)
 *
 * @export
 * @param {ApiService} ctx
 * @param {CreateSessionPayload} { type, ...payload }
 * @returns {Promise<CreateSessionResult>}
 */
export async function createSession(
  ctx: ApiService,
  { type: userFriendlyAuthType, ...payload }: CreateSessionPayload
): Promise<CreateSessionResult> {
  const realAuthenticationType = getRealAuthenticationType(
    userFriendlyAuthType
  );
  return await ctx.request({
    method: "POST",
    url: `session/${realAuthenticationType}`,
    data: payload,
  });
}
