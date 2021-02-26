import { Feed } from "store/mst/feedx-store/feed.model";
import { PublicProfile } from "store/mst/feedx-store/public-profile.model";
import { AbstractApiService } from "../abstract-api-service.interface";

// MISC
// ====================================================================
export type ApiActionPayload = Record<string, any>;
export type ApiActionResult = Record<string, any> | null | undefined;
export type NullableApiActionResult<T extends ApiActionResult> =
  | T
  | null
  | undefined;

/**
 * All possible api actions here
 *
 * @export
 * @enum {string}
 */
export enum ApiServiceActionToken {
  CREATE_SESSION = "createSession",
  RENEW_SESSION = "renewSession",
  DESTROY_SESSION = "destroySession",

  FETCH_PROFILE = "fetchProfile",
  UPDATE_PROFILE = "updateProfile",

  FETCH_FEEDS = "fetchFeeds",
  FETCH_FEED_DETAIL = "fetchFeedDetail",
}

/**
 * The action type generator
 *
 */
export declare type AbstractApiActionType<
  P extends ApiActionPayload,
  R extends ApiActionResult
> = (ctx: AbstractApiService<any, any>, payload: P) => Promise<R>;

// Realife implementations of:
// - ApiActionPayload
// - NullableApiActionResult
// ====================================================================

// Create session
// type AuthType = "login" | "register" | "github";
export type AuthType = "login" | "register"; // end user friendly type name, shown on the page
export type RealAuthType = "local" | "registration"; // reall type name for background
export function getRealAuthenticationType(type: AuthType) {
  const dict: Record<AuthType, RealAuthType> = {
    login: "local",
    register: "registration",
  };
  return dict[type];
}
export type CreateSessionPayload<T = AuthType> = T extends "login"
  ? {
      type: T;
      identifier: string;
      password: string;
    }
  : T extends "register"
  ? {
      type: T;
      name: string;
      email: string;
      password: string;
    }
  : never;
export type CreateSessionResult = NullableApiActionResult<PublicProfile>;

// Renew session
export interface RenewSessionPayload extends ApiActionPayload {
  identifier: string;
  password: string;
}
export type RenewSessionResult = NullableApiActionResult<PublicProfile>;

// Delete session
// export interface DeleteSessionPayload extends ApiActionPayload {}
export type DeleteSessionPayload = undefined;
export type DeleteSessionResult = NullableApiActionResult<{ destroyed: true }>;

// Fetch profile (user private scope)
export interface FetchProfilePayload extends ApiActionPayload {
  votes?: boolean;
  posts?: boolean;
}
export type FetchProfileResult = NullableApiActionResult<
  PublicProfile & {
    votes?: string[];
    posts?: string[];
  }
>;

// Fetch feeds (with pagination)
export interface FetchFeedsPayload extends ApiActionPayload {
  pageSize: number;
  page: number;
}
export type FetchFeedsResult = NullableApiActionResult<{
  feeds: Feed[];
  total: number;
}>;

// Fetch feed detail
export interface FetchFeedDetailPayload extends ApiActionPayload {
  pageSize: number;
  page: number;
}
export type FetchFeedDetailResult = NullableApiActionResult<Feed>;
