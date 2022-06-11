export interface Talk {
  id: string;
  title: string;
  description: string;
  votes: number;
  createdAt: Date;
  author: Author;
}

export type ListTalk = Omit<Talk, "description">;

export interface TalkJSON extends Omit<Talk, "createdAt"> {
  createdAt: string; // ISO
}

export type ListTalkJSON = Omit<TalkJSON, "description">;

export interface Author {
  id: string;
  email: string;
}

export interface CreateTalkParams {
  email: string;
  title: string;
  description: string;
}

export function fromTalkJSON(talk: TalkJSON): Talk {
  return { ...talk, createdAt: new Date(talk.createdAt) };
}

export function fromListTalkJSON(talk: ListTalkJSON): ListTalk {
  return { ...talk, createdAt: new Date(talk.createdAt) };
}
