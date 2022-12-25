import { client } from '../client';

export interface Params {
  where?: {
    my?: boolean;
  };
  take?: number;
  skip?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
}

export interface Response {
  results: Schema.Talk[];
  total: number;
}

export const queryTalks: Service<Response, Params> = (params) => {
  const { where, take, skip, orderBy } = params;
  return client.get('/talks', { where, take, skip, orderBy });
};
