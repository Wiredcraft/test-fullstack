import { FetchFeedsPayload, FetchFeedsResult } from "store/api-service/actions";
import { ApiService } from "../api";

export async function fetchFeeds(
  ctx: ApiService,
  payload: FetchFeedsPayload
): Promise<FetchFeedsResult> {
  return await ctx.request({
    method: "GET",
    url: "feeds",
    params: payload,
  });
}
