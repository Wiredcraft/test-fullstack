import { APP_URL } from '../constants';
import { requestOpts, requestApi } from '../helpers';


export function getPollsApi() {
  return requestApi(`${APP_URL}/api/polls`, requestOpts('GET'));
};

export function postPollApi(body) {
	console.log(body);
  return requestApi(`${APP_URL}/api/poll/create`, requestOpts('POST', body));
};

export function updatePollVoteApi(pollId, body) {
  return requestApi(`${APP_URL}/api/poll/${pollId}/vote`, requestOpts('PUT', body));
};
