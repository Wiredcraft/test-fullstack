import { client } from '../client';

export interface Params {
  talkId: number;
  ownerId: number;
}

export type Response = Schema.Vote | null;

export const queryVote: Service<Response, Params> = (params) => client.get('/votes', params);
