import { client } from '../client';

export interface Params {
  talkId: number;
}

export type Response = Schema.Vote;

export const createVote: Service<Response, Params> = (params) => client.post('/votes', params);
