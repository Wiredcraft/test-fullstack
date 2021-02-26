import {
  FetchProfilePayload,
  FetchProfileResult,
} from "store/api-service/actions";
import { ApiService } from "../api";

export async function fetchProfile(
  ctx: ApiService,
  { ...params }: FetchProfilePayload
): Promise<FetchProfileResult> {
  return await ctx.request({
    method: "GET",
    url: "users/profile",
    params,
  });
}
