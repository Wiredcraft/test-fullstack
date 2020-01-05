export interface TalkItem {
  id: string;
  title: string;
  description: string;
  authorName: string;
  vote: number;
  createdAt: string;
  isVoted: boolean;
}

export interface User {
  name: string;
  id: string;
  token: string;
}
