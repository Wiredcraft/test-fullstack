import { client } from '../client';

export interface Params {
  id: number;
  active: boolean;
}

export type Response = Schema.Vote;

export const updateVote: Service<Response, Params> = (params) => client.patch('/votes', params);
