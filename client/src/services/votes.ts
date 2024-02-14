import customAxios from "./customAxios";

type VoteRes = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  likeCount: number;
  liked: boolean;
}[];
export const getVotes = async () =>
  (await customAxios.get<VoteRes>("/votes")).data;
