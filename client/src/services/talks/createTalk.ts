import { client } from '../client';

export interface Params {
  title: string;
  description: string;
}

export type Response = Schema.Talk;

export const createTalk: Service<Response, Params> = (params) => client.post('/talks', params);
