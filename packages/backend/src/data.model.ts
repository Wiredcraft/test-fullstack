export interface User {
  id: number;
  name: string;
  password: string;
}

export interface Talk {
  id: number;
  subject: string;
  content: string;
  author: string;
  author_id: number;
  voted: number;
  created_time: number;
}

export interface Vote {
  id: number;
  user_id: number;
  talk_id: number;
  created_time: number;
}
