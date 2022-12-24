import { client } from '../client';

export async function whoami() {
  return client.get<{
    id: number;
    username: string;
  }>('/auth');
}
