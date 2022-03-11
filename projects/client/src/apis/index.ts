// Optimization::The best practice is to share entity types with back-end servers
export type LightningTalk = {
  id: number;
  title: string;
  description: string;
  date_created: string;
  user: string;
  poll: number;
};

type BaseResponse = { data: any; error: any };
type ErrorResponse = { data: null; error: string };
type CombineResponse<T = null> = ErrorResponse | { data: T; error: null };

export type GetLightningTalksResponse = CombineResponse<LightningTalk[]>;
export type AddLightningTalkResponse = CombineResponse<LightningTalk>;
export type AddPoll = CombineResponse<{}>;

/**
 * The api to fetch backend resource
 *
 * @param resource A valid path to the backend resource
 * @param init A request init options, just like window.fetch
 * @returns resource data or error from api
 */
async function fetchApi<T extends BaseResponse>(
  resource: RequestInfo,
  init?: RequestInit
): Promise<T> {
  try {
    const result = await fetch(
      `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${resource}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        ...init,
      }
    ).then((response) => response.json());

    // error from server
    if (result.error) {
      throw new Error(result.error);
    }
    return { error: null, data: result } as T;
  } catch (e) {
    return { error: e.message, data: null } as T;
  }
}

/**
 * Get all the lightning talks
 *
 * @returns The lightning talks data or error
 */
export function getLightningTalks(): Promise<GetLightningTalksResponse> {
  return fetchApi<GetLightningTalksResponse>("/lightning-talks");
}

/**
 * Add a lightning talk
 *
 * @param talk The required data of talk
 * @returns Saved talk data or error
 */
export function addLightningTalk(
  talk: Pick<LightningTalk, "user" | "title" | "description">
): Promise<AddLightningTalkResponse> {
  return fetchApi<AddLightningTalkResponse>("/lightning-talk", {
    method: "POST",
    body: JSON.stringify(talk),
  });
}

/**
 * Add one  poll to a specific talk
 *
 * @param lightningTalkId
 * @returns Success message or error
 */
export function addPoll(lightningTalkId: number): Promise<AddPoll> {
  return fetchApi<AddPoll>(`/lightning-talk/${lightningTalkId}/poll`, {
    method: "POST",
  });
}
