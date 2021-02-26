import { ApiActionsObjectLiteral } from "store/api-service/actions";
import { ApiServiceActionToken } from "store/api-service/actions/action-types";
import { createSession } from "./create-session.action";
import { destroySession } from "./destroy-session.action";
import { fetchFeeds } from "./fetch-feeds.action";
import { fetchProfile } from "./fetch-profile.action";

const apiActions: ApiActionsObjectLiteral = {
  [ApiServiceActionToken.CREATE_SESSION]: createSession,
  [ApiServiceActionToken.RENEW_SESSION]: createSession,
  [ApiServiceActionToken.DESTROY_SESSION]: destroySession,
  [ApiServiceActionToken.FETCH_PROFILE]: fetchProfile,
  [ApiServiceActionToken.UPDATE_PROFILE]: createSession,
  [ApiServiceActionToken.FETCH_FEEDS]: fetchFeeds,
  [ApiServiceActionToken.FETCH_FEED_DETAIL]: createSession,
};
export default apiActions;
