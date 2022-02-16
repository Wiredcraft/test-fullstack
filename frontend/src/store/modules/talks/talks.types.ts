import { DateTime } from "luxon";

export interface ITalk {
  id: string;
  title: string;
  description: string;
  votes: number;
  user: ITalkUser;
  createdAt: DateTime;
  voted: boolean;
}

export interface ITalkCreateDTO {
  title: string;
  description: string;
}

export interface ITalkReadDTO {
  id: string;
  title: string;
  description: string;
  votes: number;
  user: ITalkUser;
  createdAt: string;
}
