import { client } from '../client';

export interface Response {
  id: number;
  username: string;
}

export const whoami: Service<Response> = () => client.get('/auth');
